import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // Fetch ministry by ID
      const ministry = await prisma.ministry.findUnique({
        where: { mid: id },
      });

      if (!ministry) {
        return res.status(404).json({ error: "Ministry not found" });
      }

      return res.status(200).json(ministry);
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

      const updatedMinistry = await prisma.ministry.update({
        where: { mid: id },
        data: {
          central,
          state,
          name,
          head,
          income,
          expenditure,
          scheme,
          project,
        },
      });

      return res.status(200).json(updatedMinistry);
    } else if (req.method === "DELETE") {
      // Delete ministry by ID
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
