import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      // Fetch all persons
      const persons = await prisma.person.findMany();
      return res.status(200).json(persons);
    } else if (req.method === "POST") {
      // Create a new person
      const { pid, name, phone, address, area, position } = req.body;

      const newPerson = await prisma.person.create({
        data: {
          pid,
          name,
          phone,
          address,
          area,
          position,
        },
      });

      return res.status(201).json(newPerson);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
