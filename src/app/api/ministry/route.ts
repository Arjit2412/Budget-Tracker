import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";
import { MinistryInput } from "@/app/constants/backend";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    const stateId = url.searchParams.get("stateId");

    if (id) {
      // Fetch a single ministry by ID
      const ministry = await prisma.ministry.findUnique({
        where: { mid: id }, // Convert id to a number if it's an integer
      });

      if (!ministry) {
        return NextResponse.json({ error: "Ministry not found" }, { status: 404 });
      }

      return NextResponse.json(ministry, { status: 200 });
    }
    if(stateId && stateId !== "null" && stateId !== "undefined"){
      const ministry = await prisma.ministry.findMany({
        where: {stateId}
      });
      if(!ministry){
        return NextResponse.json({error: "Ministry not found"});
      }
      return NextResponse.json(ministry, {status: 200});
    }

    // If no id is provided, return all ministries
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
