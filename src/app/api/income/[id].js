import prisma from "../../../prisma/client";

export default async function handler(req, res) {

  try {
    if (req.method === "GET") {
      // Fetch income by ID
      const state = req.param['state'];
      const local = req.param['local'];
      const ministry = req.param['ministry'];
      const id = req.param['id'];

      if(id){
        const income = await prisma.income.findUnique({
          where: { iid: id },
          include: {
            expenditure: true,
            state: true,
            local: true,
          },
        });
        if (!income) {
          return res.status(404).json({ error: "Income not found" });
        }
        return res.status(200).json(income);
      }

      if(ministry){
        const income = await prisma.income.findMany({
          where: { ministryMid: ministry },
          include: {
            expenditure: true,
            state: true,
            local: true,
          },
        });
        if (!income) {
          return res.status(404).json({ error: "Income not found" });
        }
        return res.status(200).json(income);
      }

      if(local){
        const local = await prisma.local.findMany({
          where: { local: local },
        });
        if (!local) {
          return res.status(404).json({ error: "Local not found" });
        }
        return res.status(200).json(local);
      }

      if(state){
        const state = await prisma.state.findMany({
          where: { state: state },
        });
        if (!state) {
          return res.status(404).json({ error: "State not found" });
        }
        return res.status(200).json(state);
      }


    } else if (req.method === "PUT") {
      // Update income by ID
      const { name, desc, date, t_amount, expenditure, central, state, local } =
        req.body;

      const updatedIncome = await prisma.income.update({
        where: { iid: id },
        data: {
          name,
          desc,
          date: date ? new Date(date) : undefined,
          t_amount,
          central,
          state: state ? { connect: { sid: state } } : undefined,
          local: local ? { connect: { lid: local } } : undefined,
          expenditure: expenditure
            ? { connect: expenditure.map((eid) => ({ eid })) }
            : undefined,
        },
      });

      return res.status(200).json(updatedIncome);
    } else if (req.method === "DELETE") {
      // Delete income by ID
      await prisma.income.delete({
        where: { iid: id },
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
