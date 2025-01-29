import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // Fetch ministry by ID
      const id = req.query['id'] as string;
      const name = req.query['name'] as string;
      const state = req.query['state'] as string;
      if(id){
        const ministry = await prisma.ministry.findUnique({
          where: { mid: id },
        });
        if (!ministry) {
          return res.status(404).json({ error: "Ministry not found" });
        }
        return res.status(200).json(ministry);
      }
      if(name){
        const ministry = await prisma.ministry.findMany({
          where: { name: name },
        });
        if (!ministry) {
          return res.status(404).json({ error: "Ministry not found" });
        }
        return res.status(200).json(ministry);
      }
      if(state){
        const ministry = await prisma.ministry.findMany({
          where: { state: state },
        });
        if (!ministry) {
          return res.status(404).json({ error: "Ministry not found" });
        }
        return res.status(200).json(ministry);
      }
      
    } else if (req.method === "PUT") {
      // Update ministry by ID
      const {
        central,
        state,
        name,
        head,
        income,
        expenditure,
        scheme,
        project,
      } = req.body;

      const id = req.query["id"] as string; // ministry ID to be recieved as query parameter

      if (!id) {
        return res.status(400).json({ error: "Ministry ID is required" });
      }

      const updatedMinistry = await prisma.ministry.update({
        where: { mid: id },
        data: {
          central,
          state,
          name,
        },
      });

      return res.status(200).json(updatedMinistry);
    } else if (req.method === "DELETE") {
      // Delete ministry by ID
      const id = req.query["id"] as string; // ministry ID to be recieved as query parameter

      if (!id) {
        return res.status(400).json({ error: "Ministry ID is required" });
      }
      await prisma.ministry.delete({
        where: { mid: id },
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
