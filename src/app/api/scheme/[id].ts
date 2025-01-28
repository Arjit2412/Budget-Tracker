import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // Fetch scheme by ID
      const id = req.query["id"] as string;
      const name = req.query["name"] as string;
      if(id){
        const scheme = await prisma.scheme.findUnique({
          where: { sid: id },
          include: {
            state: true,
            head: true,
            expenditure: true,
          },
        });
        if (!scheme) {
          return res.status(404).json({ error: "Scheme not found" });
        }
        return res.status(200).json(scheme);
      }
      if(name){
        const scheme = await prisma.scheme.findMany({
          where: { name: name },
          include: {
            state: true,
            head: true,
            expenditure: true,
          },
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
        state,
        start,
        end,
        status,
        head,
        photo,
        expenditure,
      } = req.body;

      const id = req.query["id"] as string;

      if (!id) {
        return res.status(400).json({ error: "Ministry ID is required" });
      }
      const updatedScheme = await prisma.scheme.update({
        where: { sid: id },
        data: {
          name,
          desc,
          central,
          start: start,
          end: end,
          status,
          head: head ? { connect: head.map((pid: string) => ({ pid })) } : undefined,
          state: state ? { connect: state.map((sid: string) => ({ sid })) } : undefined,
          photo,
          expenditure: expenditure
            ? { connect: expenditure.map((eid: string) => ({ eid })) }
            : undefined,
        },
      });

      return res.status(200).json(updatedScheme);
    } else if (req.method === "DELETE") {
      // Delete scheme by ID
      const id = req.query["id"] as string;

      if (!id) {
        return res.status(400).json({ error: "Ministry ID is required" });
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
