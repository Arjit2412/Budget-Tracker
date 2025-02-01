import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const stateId = url.searchParams.get("stateId");
    if(stateId && stateId !== "undefined"){
      const state = await prisma.state.findUnique({
        where: {sid: stateId}
      });
      return NextResponse.json(state,{status: 200});
    }
    // Fetch all states
    const states = await prisma.state.findMany();
    return NextResponse.json(states, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json(); // Read JSON body
    
    const sid = uuidv4();
    const newState = await prisma.state.create({
      data: { sid, name },
    });

    return NextResponse.json(newState, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
