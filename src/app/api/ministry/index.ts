import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { v4 as uuidv4 } from "uuid";
import { MinistryInput } from "@/app/constants/backend";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // Fetch all ministries
      const ministries = await prisma.ministry.findMany();
      return res.status(200).json(ministries);
    } else if (req.method === "POST") {
      // Create a new ministry
      const {
        central,
        state,
        name,
        desc
      } = req.body as MinistryInput;
      if (central && state) throw new Error("State value should be null when central is true");
      if (!name || !desc) throw new Error("Ministry name and description can't be null")
      const mid = uuidv4();
      const newMinistry = await prisma.ministry.create({
        data: {
          mid,
          central,
          state,
          name,
          desc
        },
      });

      return res.status(201).json(newMinistry);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
