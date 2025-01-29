import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req:NextApiRequest, res: NextApiResponse) {

  try {
    if (req.method === "GET") {
      // Fetch income by ID
      const state = req.query['state'] as string;
      const localParam = req.query['local'] as string;
      const ministry = req.query['ministry'] as string;
      const id = req.query['id'] as string;

      
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

      if(localParam){
        const local = await prisma.local.findMany({
          where: { localId: localParam },
        });
        if (!local) {
          return res.status(404).json({ error: "Local not found" });
        }
        return res.status(200).json(localParam);
      }

      if(state){
        const stateRes = await prisma.state.findMany({
          where: { state: state },
        });
        if (!stateRes) {
          return res.status(404).json({ error: "State not found" });
        }
        return res.status(200).json(stateRes);
      }


    } else if (req.method === "PUT") {
      // Update income by ID
      const { name, desc, date, t_amount, expenditure, central, state, local } =
        req.body;
        const id = req.query["id"] as string;

        if (!id) {
          return res.status(400).json({ error: "Ministry ID is required" });
        }
      const updatedIncome = await prisma.income.update({
        where: { iid: id },
        data: {
          name,
          desc,
          date: date,
          t_amount,
          central,
          state: state ? { connect: { sid: state } } : undefined,
          local: local ? { connect: { lid: local } } : undefined,
          expenditure: expenditure
            ? { connect: expenditure.map((eid: string) => ({ eid })) }
            : undefined,
        },
      });

      return res.status(200).json(updatedIncome);
    } else if (req.method === "DELETE") {
      // Delete income by ID
      const id = req.query["id"] as string;

      if (!id) {
        return res.status(400).json({ error: "Ministry ID is required" });
      }
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
