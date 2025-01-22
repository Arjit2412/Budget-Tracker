import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Fetch all states
      const states = await prisma.state.findMany();
      return res.status(200).json(states);
    } else if (req.method === "POST") {
      // Create a new state
      const { sid, name, head, ministry, income, project, scheme } = req.body;

      const newState = await prisma.state.create({
        data: {
          sid,
          name,
          head: { connect: head.map((id) => ({ pid: id })) },
          ministry: { connect: ministry.map((id) => ({ mid: id })) },
          income: { connect: income.map((id) => ({ iid: id })) },
          project: { connect: project.map((id) => ({ pid: id })) },
          scheme: { connect: scheme.map((id) => ({ sid: id })) },
        },
      });

      return res.status(201).json(newState);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
