import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // Fetch state by ID
      const state = await prisma.state.findUnique({
        where: { sid: id },
        include: {
          head: true,
          ministry: true,
          income: true,
          project: true,
          scheme: true,
        },
      });

      if (!state) {
        return res.status(404).json({ error: "State not found" });
      }

      return res.status(200).json(state);
    } else if (req.method === "PUT") {
      // Update state by ID
      const { name, head, ministry, income, project, scheme } = req.body;

      const updatedState = await prisma.state.update({
        where: { sid: id },
        data: {
          name,
          head: { set: head.map((id) => ({ pid: id })) },
          ministry: { set: ministry.map((id) => ({ mid: id })) },
          income: { set: income.map((id) => ({ iid: id })) },
          project: { set: project.map((id) => ({ pid: id })) },
          scheme: { set: scheme.map((id) => ({ sid: id })) },
        },
      });

      return res.status(200).json(updatedState);
    } else if (req.method === "DELETE") {
      // Delete state by ID
      await prisma.state.delete({
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
