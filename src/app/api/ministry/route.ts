import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";
import { MinistryInput } from "@/app/constants/backend";

export async function GET() {
  try {
    const ministries = await prisma.ministry.findMany();
    return NextResponse.json(ministries, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body: MinistryInput = await req.json();
    const { central, stateId, name, desc } = body;

    if (central && stateId) {
      return NextResponse.json({ error: "State value should be null when central is true" }, { status: 400 });
    }
    if (!name || !desc) {
      return NextResponse.json({ error: "Ministry name and description can't be null" }, { status: 400 });
    }

    const mid = uuidv4();
    const newMinistry = await prisma.ministry.create({
      data: {
        mid,
        central,
        stateId,
        name,
        desc,
      },
    });

    return NextResponse.json(newMinistry, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
