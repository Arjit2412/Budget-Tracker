import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Person ID is required" }, { status: 400 });
    }

    const person = await prisma.person.findUnique({
      where: { pid: id },
    });

    if (!person) {
      return NextResponse.json({ error: "Person not found" }, { status: 404 });
    }

    return NextResponse.json(person, { status: 200 });
  } catch (error) {
    console.error("Error fetching person:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, phone, address, area, position } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Person ID is required" }, { status: 400 });
    }

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

    return NextResponse.json(updatedPerson, { status: 200 });
  } catch (error) {
    console.error("Error updating person:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Person ID is required" }, { status: 400 });
    }

    await prisma.person.delete({
      where: { pid: id },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error deleting person:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
