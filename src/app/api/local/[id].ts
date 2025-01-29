import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // Fetch local by ID
      const id = req.query["id"] as string;

      if (!id) {
        return res.status(400).json({ error: "Local ID is required" });
      }
      const local = await prisma.local.findUnique({
        where: { lid: id },
      });

      if (!local) {
        return res.status(404).json({ error: "Local not found" });
      }

      return res.status(200).json(local);
    } else if (req.method === "PUT") {
      // Update local by ID
      const { name, head, income, scheme, project, expenditure } = req.body;
      const id = req.query["id"] as string;

      if (!id) {
        return res.status(400).json({ error: "Local ID is required" });
      }
      const updatedLocal = await prisma.local.update({
        where: { lid: id },
        data: {
          name,
          incomes: income
            ? { connect: income.map((iid: string) => ({ iid })) }
            : undefined,
        },
      });

      return res.status(200).json(updatedLocal);
    } else if (req.method === "DELETE") {
      // Delete local by ID
      const id = req.query["id"] as string;

      if (!id) {
        return res.status(400).json({ error: "Local ID is required" });
      }
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
