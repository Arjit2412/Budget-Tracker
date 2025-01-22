import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Fetch all incomes
      const incomes = await prisma.income.findMany({
        include: {
          expenditure: true,
          state: true,
          local: true,
        },
      });
      return res.status(200).json(incomes);
    } else if (req.method === "POST") {
      // Create a new income
      const {
        iid,
        name,
        desc,
        date,
        t_amount,
        expenditure,
        central,
        state,
        local,
      } = req.body;

      const newIncome = await prisma.income.create({
        data: {
          iid,
          name,
          desc,
          date: new Date(date), // Convert millisec to Date object
          t_amount,
          central,
          state: state ? { connect: { sid: state } } : undefined,
          local: local ? { connect: { lid: local } } : undefined,
          expenditure: expenditure
            ? { connect: expenditure.map((eid) => ({ eid })) }
            : undefined,
        },
      });

      return res.status(201).json(newIncome);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
