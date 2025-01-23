import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Fetch all expenditures
      const expenditures = await prisma.expenditure.findMany();
      return res.status(200).json(expenditures);
    } else if (req.method === "POST") {
      // Create a new expenditure
      const { eid, image, desc, name, amount, project, scheme } = req.body;

      const newExpenditure = await prisma.expenditure.create({
        data: {
          eid,
          image,
          desc,
          name,
          amount,
          project: project ? { connect: { pid: project } } : undefined,
          scheme: scheme ? { connect: { sid: scheme } } : undefined,
        },
      });

      return res.status(201).json(newExpenditure);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
