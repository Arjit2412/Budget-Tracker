import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { ExpenditureInput } from "@/app/constants/backend";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Expenditure ID is required" }, { status: 400 });
    }

    const expenditure = await prisma.expenditure.findUnique({
      where: { eid: id },
      include: { project: true, scheme: true },
    });

    if (!expenditure) {
      return NextResponse.json({ error: "Expenditure not found" }, { status: 404 });
    }

    return NextResponse.json(expenditure, { status: 200 });
  } catch (error) {
    console.error("Error fetching expenditure:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { desc, name, amount } = await req.json() as ExpenditureInput;

    if (!id) {
      return NextResponse.json({ error: "Expenditure ID is required" }, { status: 400 });
    }

    const updatedExpenditure = await prisma.expenditure.update({
      where: { eid: id },
      data: { desc, name, amount },
    });

    return NextResponse.json(updatedExpenditure, { status: 200 });
  } catch (error) {
    console.error("Error updating expenditure:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Expenditure ID is required" }, { status: 400 });
    }

    await prisma.expenditure.delete({
      where: { eid: id },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error deleting expenditure:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
