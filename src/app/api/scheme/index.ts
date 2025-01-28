import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { v4 as uuidv4 } from "uuid";
import { SchemeInput } from "@/app/constants/backend";
import createImgbbUrl from "../helpers/imgbbFileUpload";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // Fetch all schemes
      const schemes = await prisma.scheme.findMany({});
      return res.status(200).json(schemes);
    } else if (req.method === "POST") {
      // Create a new scheme
      const {
        name,
        desc,
        central,
        stateIds,
        start,
        end,
        status,
        photos,
        ministryId,
        localIds
      } = req.body as SchemeInput;
      if (central && (stateIds.length === 0 && localIds.length === 0 && !ministryId)) {
        throw new Error("Either stateIds, localIds or ministryId is needed when central is true");
      }
      if (stateIds.length === 0 && localIds.length === 0) {
        throw new Error("Central is false and no state id or local id given");
      }
      if (stateIds.length > 1 && ministryId) {
        throw new Error("To create a Scheme under a state ministry. The stateIds array should be of length 1");
      }
      const sid = uuidv4();
      const transformedPhotos = await Promise.all(photos.map(async (image) => {
        const { desc, photo } = image;
        const url = (await createImgbbUrl(photo))?.url as string;
        return { desc: desc, photo: url };
      }))
      const newScheme = await prisma.scheme.create({
        data: {
          sid,
          name,
          desc,
          central,
          start,
          end: end ? end : null,
          status,
          stateIds: stateIds.length > 0 ? stateIds : undefined,
          localIds: localIds.length > 0 ? localIds : undefined,
          ministryId: ministryId ? ministryId : undefined,
          photos: transformedPhotos,
        },
      });

      return res.status(201).json(newScheme);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
