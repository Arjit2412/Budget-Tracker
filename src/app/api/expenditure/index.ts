import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { v4 as uuidv4 } from "uuid";
import { ExpenditureInput } from "@/app/constants/backend";
import createImgbbUrl from "../helpers/imgbbFileUpload";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // Fetch all expenditures
      const expenditures = await prisma.expenditure.findMany();
      return res.status(200).json(expenditures);
    } else if (req.method === "POST") {
      // Create a new expenditure
      const { incomeId, central, ministryId, stateId, photo, desc, name, amount, projectId, schemeId } = req.body as ExpenditureInput;
      const eid = uuidv4();
      const image = (await createImgbbUrl(photo))?.url as string;
      const newExpenditure = await prisma.expenditure.create({
        data: {
          eid,
          photo: image,
          desc,
          name,
          amount,
          project: projectId ? { connect: { pid: projectId } } : undefined,
          scheme: schemeId ? { connect: { sid: schemeId } } : undefined,
          income: incomeId ? { connect: { iid: incomeId } } : undefined,
          central,
          ministry: ministryId ? { connect: { mid: ministryId } } : undefined,
          state: stateId ? { connect: { sid: stateId } } : undefined,
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
