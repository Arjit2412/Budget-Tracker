import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { SchemeInput } from "@/app/constants/backend";
import createImgbbUrl from "../helpers/imgbbFileUpload";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    if (req.method === "GET") {
      // Fetch scheme by ID
      const id = req.query["id"] as string;
      const name = req.query["name"] as string;
      if(id){
        const scheme = await prisma.scheme.findUnique({
          where: { sid: id },
        });
        if (!scheme) {
          return res.status(404).json({ error: "Scheme not found" });
        }
        return res.status(200).json(scheme);
      }
      if(name){
        const scheme = await prisma.scheme.findMany({
          where: { name: name },
        });
        if (!scheme) {
          return res.status(404).json({ error: "Scheme not found" });
        }
        return res.status(200).json(scheme);
      }
      
    } else if (req.method === "PUT") {
      // Update scheme by ID
      const {
        name,
        desc,
        central,
        start,
        end,
        status,
        photos,
      } = req.body as SchemeInput;

      const id = req.query["id"] as string;

      if (!id) {
        return res.status(400).json({ error: "Scheme ID is required" });
      }
      const transformedPhotos = await Promise.all(photos.map(async (image) => {
              const { desc, photo } = image;
              const url = (await createImgbbUrl(photo))?.url as string;
              return { desc: desc, photo: url };
            }))
      const updatedScheme = await prisma.scheme.update({
        where: { sid: id },
        data: {
          name,
          desc,
          central,
          start: start,
          end: end,
          status,
          photos: transformedPhotos,
        },
      });

      return res.status(200).json(updatedScheme);
    } else if (req.method === "DELETE") {
      // Delete scheme by ID
      const id = req.query["id"] as string;

      if (!id) {
        return res.status(400).json({ error: "Scheme ID is required" });
      }
      await prisma.scheme.delete({
        where: { sid: id },
      });

      return res.status(204).end();
    } else {
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
