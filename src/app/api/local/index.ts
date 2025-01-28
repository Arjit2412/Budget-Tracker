import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { v4 as uuidv4 } from "uuid";
import { LocalInput } from "@/app/constants/backend";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // Fetch all locals
      const locals = await prisma.local.findMany({});
      return res.status(200).json(locals);
    } else if (req.method === "POST") {
      // Create a new local
      const { name } = req.body as LocalInput;
      if (!name)
        throw new Error("Name of locality can't be empty");
      const lid = uuidv4();
      const newLocal = await prisma.local.create({
        data: {
          lid,
          name,
        },
      });

      return res.status(201).json(newLocal);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
