import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // Fetch scheme by ID
      const scheme = await prisma.scheme.findUnique({
        where: { sid: id },
        include: {
          state: true,
          head: true,
          expenditure: true,
        },
      });

      if (!scheme) {
        return res.status(404).json({ error: "Scheme not found" });
      }

      return res.status(200).json(scheme);
    } else if (req.method === "PUT") {
      // Update scheme by ID
      const {
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

      const updatedScheme = await prisma.scheme.update({
        where: { sid: id },
        data: {
          name,
          desc,
          central,
          start: start ? new Date(start) : undefined,
          end: end ? new Date(end) : undefined,
          status,
          head: head ? { connect: head.map((pid) => ({ pid })) } : undefined,
          state: state ? { connect: state.map((sid) => ({ sid })) } : undefined,
          photo,
          expenditure: expenditure
            ? { connect: expenditure.map((eid) => ({ eid })) }
            : undefined,
        },
      });

      return res.status(200).json(updatedScheme);
    } else if (req.method === "DELETE") {
      // Delete scheme by ID
      await prisma.scheme.delete({
        where: { sid: id },
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
