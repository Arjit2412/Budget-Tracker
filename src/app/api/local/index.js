import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Fetch all locals
      const locals = await prisma.local.findMany({
        include: {
          head: true,
          income: true,
          scheme: true,
          project: true,
          expenditure: true,
        },
      });
      return res.status(200).json(locals);
    } else if (req.method === "POST") {
      // Create a new local
      const { lid, name, head, income, scheme, project, expenditure } =
        req.body;

      const newLocal = await prisma.local.create({
        data: {
          lid,
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

      return res.status(201).json(newLocal);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
