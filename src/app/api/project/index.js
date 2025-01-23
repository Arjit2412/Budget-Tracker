import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Fetch all projects
      const projects = await prisma.project.findMany();
      return res.status(200).json(projects);
    } else if (req.method === "POST") {
      // Create a new project
      const {
        pid,
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

      const newProject = await prisma.project.create({
        data: {
          pid,
          name,
          desc,
          start: new Date(start),
          end: end ? new Date(end) : null,
          status,
          head: { connect: head.map((id) => ({ pid: id })) },
          state: { connect: state.map((id) => ({ sid: id })) },
          allocation: { connect: allocation.map((id) => ({ eid: id })) },
          photos,
          central,
          local: { connect: local.map((id) => ({ lid: id })) },
        },
      });

      return res.status(201).json(newProject);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
