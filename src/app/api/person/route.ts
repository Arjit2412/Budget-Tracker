import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";
import { PersonInput } from "@/app/constants/backend";
import createImgbbUrl from "../helpers/imgbbFileUpload";

export async function GET() {
  try {
    // Fetch all persons
    const persons = await prisma.person.findMany();
    return NextResponse.json(persons ?? [], { status: 200 });
  } catch (error) {
    console.error("Error fetching persons:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as PersonInput;
    const { name, phone, address, area, position, photo } = body;

    if (!photo) throw new Error("Photo not given");
    if (!name || !phone || (area.length === 0 && position.length === 0)) {
      throw new Error("Either name, phone number is missing, or both area and position array are empty");
    }

    const pid = uuidv4();
    const image = await createImgbbUrl(photo);

    const newPerson = await prisma.person.create({
      data: {
        pid,
        name,
        phone,
        address,
        area,
        position,
        photo: image?.url as string,
      },
    });

    return NextResponse.json(newPerson, { status: 201 });
  } catch (error) {
    console.error("Error creating person:", error);
    return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
  }
}
