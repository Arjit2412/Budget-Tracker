import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";
import { LocalInput } from "@/app/constants/backend";

export async function GET() {
  try {
    // Fetch all locals
    const locals = await prisma.local.findMany();
    return NextResponse.json(locals ?? [], { status: 200 });
  } catch (error) {
    console.error("Error fetching locals:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as LocalInput;
    const { name } = body;

    if (!name) {
      throw new Error("Name of locality can't be empty");
    }

    const lid = uuidv4();
    const newLocal = await prisma.local.create({
      data: {
        lid,
        name,
      },
    });

    return NextResponse.json(newLocal, { status: 201 });
  } catch (error) {
    console.error("Error creating local:", error);
    return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
  }
}
