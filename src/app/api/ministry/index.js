import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Fetch all ministries
      const ministries = await prisma.ministry.findMany();
      return res.status(200).json(ministries);
    } else if (req.method === "POST") {
      // Create a new ministry
      const {
        mid,
        central,
        state,
        name,
        head,
        income,
        expenditure,
        scheme,
        project,
      } = req.body;

      const newMinistry = await prisma.ministry.create({
        data: {
          mid,
          central,
          state,
          name,
          head,
          income,
          expenditure,
          scheme,
          project,
        },
      });

      return res.status(201).json(newMinistry);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
