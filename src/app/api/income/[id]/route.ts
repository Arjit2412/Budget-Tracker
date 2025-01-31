import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IncomeInput } from "@/app/constants/backend";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const url = new URL(req.url);
    const state = url.searchParams.get("state");
    const localParam = url.searchParams.get("local");
    const ministry = url.searchParams.get("ministry");

    if (id) {
      const income = await prisma.income.findUnique({
        where: { iid: id },
        include: { state: true, local: true },
      });
      if (!income) {
        return NextResponse.json({ error: "Income not found" }, { status: 404 });
      }
      return NextResponse.json(income, { status: 200 });
    }

    if (ministry) {
      const income = await prisma.income.findMany({
        where: { ministryId: ministry },
        include: { state: true, local: true },
      });
      return NextResponse.json(income, { status: 200 });
    }

    if (localParam) {
      const localIncome = await prisma.income.findMany({
        where: { localId: localParam },
      });
      return NextResponse.json(localIncome, { status: 200 });
    }

    if (state) {
      const stateIncome = await prisma.income.findMany({
        where: { stateId: state },
      });
      return NextResponse.json(stateIncome, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
  } catch (error) {
    console.error("Error fetching income:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, desc, date, central } = await req.json() as IncomeInput;

    if (!id) {
      return NextResponse.json({ error: "Income ID is required" }, { status: 400 });
    }

    const updatedIncome = await prisma.income.update({
      where: { iid: id },
      data: { name, desc, date, central },
    });

    return NextResponse.json(updatedIncome, { status: 200 });
  } catch (error) {
    console.error("Error updating income:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Income ID is required" }, { status: 400 });
    }

    await prisma.income.delete({
      where: { iid: id },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error deleting income:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
