import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // Fetch project by ID
      const project = await prisma.project.findUnique({
        where: { pid: id },
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

      const updatedProject = await prisma.project.update({
        where: { pid: id },
        data: {
          name,
          desc,
          start: new Date(start),
          end: end ? new Date(end) : null,
          status,
          head: { set: head.map((id) => ({ pid: id })) },
          state: { set: state.map((id) => ({ sid: id })) },
          allocation: { set: allocation.map((id) => ({ eid: id })) },
          photos,
          central,
          local: { set: local.map((id) => ({ lid: id })) },
        },
      });

      return res.status(200).json(updatedProject);
    } else if (req.method === "DELETE") {
      // Delete project by ID
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
