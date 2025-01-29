import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { v4 as uuidv4 } from "uuid";
import { PersonInput } from "@/app/constants/backend";
import createImgbbUrl from "../helpers/imgbbFileUpload";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // Fetch all persons
      const persons = await prisma.person.findMany();
      return res.status(200).json(persons);
    } else if (req.method === "POST") {
      // Create a new person
      const { name, phone, address, area, position, photo } = req.body as PersonInput;
      if (!photo) throw new Error("Photo not given");
      if (!name || !phone || (area.length == 0 && position.length == 0)) throw new Error("Either name, phone number is missing. Or both area and position array are empty");
      const pid = uuidv4();
      const image = await createImgbbUrl(photo);
      const newPerson = await prisma.person.create({
        data: {
          pid,
          name,
          phone,
          address,
          area,
          position,
          photo: image?.url as string,
        },
      });

      return res.status(201).json(newPerson);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
