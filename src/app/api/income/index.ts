import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { v4 as uuidv4 } from "uuid";
import { IncomeInput } from "@/app/constants/backend";


// expenditure object is used to +ve the money as supposed to -ve the money in other objects

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // Fetch all incomes
      const incomes = await prisma.income.findMany({
      });
      return res.status(200).json(incomes);
    } else if (req.method === "POST") {
      // Create a new income
      const {
        name,
        desc,
        date,
        central,
        stateId,
        localId,
        ministryId
      } = req.body as IncomeInput;
      if (central && (stateId || localId))
        throw new Error("Make central false if you want to give state and local");
      if (stateId) {
        const stateObject = await prisma.state.findUnique({
          where: { sid: stateId }
        });
        if (!stateObject) throw new Error("No such state exists");
      }
      if (localId) {
        const localObject = await prisma.local.findUnique({
          where: { lid: localId }
        });
        if (!localObject) throw new Error("Now such local exists");
      }
      const iid = uuidv4();
      const t_amount = "0"; // amount calculated as expenditures are added
      const newIncome = await prisma.income.create({
        data: {
          iid,
          name,
          desc,
          date,
          t_amount,
          central,
          state: stateId ? { connect: { sid: stateId } } : undefined,
          local: localId ? { connect: { lid: localId } } : undefined,
          ministry: ministryId ? { connect: { mid: ministryId } } : undefined,
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
