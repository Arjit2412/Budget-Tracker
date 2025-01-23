import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Fetch all schemes
      const schemes = await prisma.scheme.findMany({
        include: {
          state: true,
          head: true,
          expenditure: true,
        },
      });
      return res.status(200).json(schemes);
    } else if (req.method === "POST") {
      // Create a new scheme
      const {
        sid,
        name,
        desc,
        central,
        state,
        start,
        end,
        status,
        head,
        photo,
        expenditure,
      } = req.body;

      const newScheme = await prisma.scheme.create({
        data: {
          sid,
          name,
          desc,
          central,
          start: new Date(start),
          end: new Date(end),
          status,
          head: head ? { connect: head.map((pid) => ({ pid })) } : undefined,
          state: state ? { connect: state.map((sid) => ({ sid })) } : undefined,
          photo,
          expenditure: expenditure
            ? { connect: expenditure.map((eid) => ({ eid })) }
            : undefined,
        },
      });

      return res.status(201).json(newScheme);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
