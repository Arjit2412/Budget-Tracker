import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { v4 as uuidv4 } from "uuid";
import { StateInput } from "@/app/constants/backend";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // Fetch all states
      const states = await prisma.state.findMany();
      return res.status(200).json(states);
    } else if (req.method === "POST") {
      // Create a new state
      const { name } = req.body as StateInput;
      const sid = uuidv4();
      const newState = await prisma.state.create({
        data: {
          sid,
          name,
        },
      });

      return res.status(201).json(newState);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
