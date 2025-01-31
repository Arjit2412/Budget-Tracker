import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IncomeInput } from "@/app/constants/backend";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Local ID is required" }, { status: 400 });
    }

    const local = await prisma.local.findUnique({
      where: { lid: id },
    });

    if (!local) {
      return NextResponse.json({ error: "Local not found" }, { status: 404 });
    }

    return NextResponse.json(local, { status: 200 });
  } catch (error) {
    console.error("Error fetching local:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name } = await req.json() as IncomeInput;

    if (!id) {
      return NextResponse.json({ error: "Local ID is required" }, { status: 400 });
    }

    const updatedLocal = await prisma.local.update({
      where: { lid: id },
      data: { name },
    });

    return NextResponse.json(updatedLocal, { status: 200 });
  } catch (error) {
    console.error("Error updating local:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Local ID is required" }, { status: 400 });
    }

    await prisma.local.delete({
      where: { lid: id },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error deleting local:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
