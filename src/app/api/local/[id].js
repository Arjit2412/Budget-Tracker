import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // Fetch local by ID
      const local = await prisma.local.findUnique({
        where: { lid: id },
        include: {
          head: true,
          income: true,
          scheme: true,
          project: true,
          expenditure: true,
        },
      });

      if (!local) {
        return res.status(404).json({ error: "Local not found" });
      }

      return res.status(200).json(local);
    } else if (req.method === "PUT") {
      // Update local by ID
      const { name, head, income, scheme, project, expenditure } = req.body;

      const updatedLocal = await prisma.local.update({
        where: { lid: id },
        data: {
          name,
          head: head ? { connect: head.map((pid) => ({ pid })) } : undefined,
          income: income
            ? { connect: income.map((iid) => ({ iid })) }
            : undefined,
          scheme: scheme
            ? { connect: scheme.map((sid) => ({ sid })) }
            : undefined,
          project: project
            ? { connect: project.map((pid) => ({ pid })) }
            : undefined,
          expenditure: expenditure
            ? { connect: expenditure.map((eid) => ({ eid })) }
            : undefined,
        },
      });

      return res.status(200).json(updatedLocal);
    } else if (req.method === "DELETE") {
      // Delete local by ID
      await prisma.local.delete({
        where: { lid: id },
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
