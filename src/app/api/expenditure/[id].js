import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // Fetch expenditure by ID
      const expenditure = await prisma.expenditure.findUnique({
        where: { eid: id },
        include: {
          project: true,
          scheme: true,
        },
      });

      if (!expenditure) {
        return res.status(404).json({ error: "Expenditure not found" });
      }

      return res.status(200).json(expenditure);
    } else if (req.method === "PUT") {
      // Update expenditure by ID
      const { image, desc, name, amount, project, scheme } = req.body;

      const updatedExpenditure = await prisma.expenditure.update({
        where: { eid: id },
        data: {
          image,
          desc,
          name,
          amount,
          project: project ? { connect: { pid: project } } : undefined,
          scheme: scheme ? { connect: { sid: scheme } } : undefined,
        },
      });

      return res.status(200).json(updatedExpenditure);
    } else if (req.method === "DELETE") {
      // Delete expenditure by ID
      await prisma.expenditure.delete({
        where: { eid: id },
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
