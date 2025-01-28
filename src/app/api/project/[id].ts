import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // Fetch project by ID
      const pid = req.query["id"] as string;
      const name = req.query["name"] as string;
      
      if (pid) {
        const project = await prisma.project.findUnique({
          where: { pid: pid },
          include: {
            head: true,
            state: true,
            allocation: true,
            local: true,
          },
        });

        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }

        return res.status(200).json(project);
      }
      if(name){
        const project = await prisma.project.findMany({
          where: { name: name },
          include: {
            head: true,
            state: true,
            allocation: true,
            local: true,
          },
        });

        if (!project) {
          return res.status(404).json({ error: "Project not found" });
        }

        return res.status(200).json(project);
      }

    } else if (req.method === "PUT") {
      // Update project by ID
      const {
        name,
        desc,
        start,
        end,
        status,
        head,
        state,
        allocation,
        photos,
        central,
        local,
      } = req.body;

      const id = req.query["id"] as string;

      if (!id) {
        return res.status(400).json({ error: "Ministry ID is required" });
      }

      const updatedProject = await prisma.project.update({
        where: { pid: id },
        data: {
          name,
          desc,
          start: start,
          end: end,
          status,
          head: { set: head.map((id: string) => ({ pid: id })) },
          state: { set: state.map((id: string) => ({ sid: id })) },
          allocation: { set: allocation.map((id: string) => ({ eid: id })) },
          photos,
          central,
          local: { set: local.map((id: string) => ({ lid: id })) },
        },
      });

      return res.status(200).json(updatedProject);
    } else if (req.method === "DELETE") {
      // Delete project by ID
      const id = req.query["id"] as string;

      if (!id) {
        return res.status(400).json({ error: "Ministry ID is required" });
      }
      await prisma.project.delete({
        where: { pid: id },
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
