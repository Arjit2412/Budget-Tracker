import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { StateInput } from "@/app/constants/backend";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "State ID is required" }, { status: 400 });
    }

    const state = await prisma.state.findUnique({
      where: { sid: id },
    });

    if (!state) {
      return NextResponse.json({ error: "State not found" }, { status: 404 });
    }

    return NextResponse.json(state, { status: 200 });
  } catch (error) {
    console.error("Error fetching state:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name } = await req.json() as StateInput;

    if (!id) {
      return NextResponse.json({ error: "State ID is required" }, { status: 400 });
    }

    const updatedState = await prisma.state.update({
      where: { sid: id },
      data: { name },
    });

    return NextResponse.json(updatedState, { status: 200 });
  } catch (error) {
    console.error("Error updating state:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "State ID is required" }, { status: 400 });
    }

    await prisma.state.delete({
      where: { sid: id },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error deleting state:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
