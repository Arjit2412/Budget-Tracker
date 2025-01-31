import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";
import { IncomeInput } from "@/app/constants/backend";

// Expenditure object is used to +ve the money as opposed to -ve the money in other objects

export async function GET() {
  try {
    // Fetch all incomes
    const incomes = await prisma.income.findMany();
    return NextResponse.json(incomes ?? [], { status: 200 });
  } catch (error) {
    console.error("Error fetching incomes:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as IncomeInput;
    const { name, desc, date, central, stateId, localId, ministryId } = body;

    if (central && (stateId || localId)) {
      throw new Error("Make central false if you want to provide state and local");
    }

    // Validate state existence
    if (stateId) {
      const stateExists = await prisma.state.findUnique({ where: { sid: stateId } });
      if (!stateExists) throw new Error("No such state exists");
    }

    // Validate local existence
    if (localId) {
      const localExists = await prisma.local.findUnique({ where: { lid: localId } });
      if (!localExists) throw new Error("No such local exists");
    }

    const iid = uuidv4();
    const t_amount = "0"; // Amount calculated as expenditures are added

    const newIncome = await prisma.income.create({
      data: {
        iid,
        name,
        desc,
        date,
        t_amount,
        central,
        state: stateId ? { connect: { sid: stateId } } : undefined,
        local: localId ? { connect: { lid: localId } } : undefined,
        ministry: ministryId ? { connect: { mid: ministryId } } : undefined,
      },
    });

    return NextResponse.json(newIncome, { status: 201 });
  } catch (error) {
    console.error("Error creating income:", error);
    return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
  }
}
