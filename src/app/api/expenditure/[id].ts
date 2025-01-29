import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { ExpenditureInput } from "@/app/constants/backend";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    if (req.method === "GET") {
      // Fetch expenditure by ID
      const id = req.query["id"] as string;

      if (!id) {
        return res.status(400).json({ error: "Project ID is required" });
      }
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
      const { desc, name, amount } = req.body as ExpenditureInput;
      const id = req.query["id"] as string;

      if (!id) {
        return res.status(400).json({ error: "Project ID is required" });
      }
      const updatedExpenditure = await prisma.expenditure.update({
        where: { eid: id },
        data: {
          desc,
          name,
          amount,
        },
      });

      return res.status(200).json(updatedExpenditure);
    } else if (req.method === "DELETE") {
      // Delete expenditure by ID
      const id = req.query["id"] as string;

      if (!id) {
        return res.status(400).json({ error: "Project ID is required" });
      }
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
