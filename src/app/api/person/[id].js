import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      // Fetch person by ID
      const person = await prisma.person.findUnique({
        where: { pid: id },
      });

      if (!person) {
        return res.status(404).json({ error: "Person not found" });
      }

      return res.status(200).json(person);
    } else if (req.method === "PUT") {
      // Update person by ID
      const { name, phone, address, area, position } = req.body;

      const updatedPerson = await prisma.person.update({
        where: { pid: id },
        data: {
          name,
          phone,
          address,
          area,
          position,
        },
      });

      return res.status(200).json(updatedPerson);
    } else if (req.method === "DELETE") {
      // Delete person by ID
      await prisma.person.delete({
        where: { pid: id },
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
