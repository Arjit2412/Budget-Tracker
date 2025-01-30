import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";
import { ExpenditureInput } from "@/app/constants/backend";
import createImgbbUrl from "@/app/api/helpers/imgbbFileUpload";

export async function GET() {
  try {
    // Fetch all expenditures
    const expenditures = await prisma.cashflow.findMany();
    return NextResponse.json(expenditures ?? [], { status: 200 });
  } catch (error) {
    console.error("Error fetching expenditures:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ExpenditureInput;
    const { incomeId, central, ministryId, stateId, photo, desc, name, amount, projectId, schemeId } = body;

    const eid = uuidv4();

    // Upload image to ImgBB
    const image = (await createImgbbUrl(photo))?.url as string;

    const newExpenditure = await prisma.cashflow.create({
      data: {
        eid,
        photo: image,
        desc,
        name,
        amount,
        project: projectId ? { connect: { pid: projectId } } : undefined,
        scheme: schemeId ? { connect: { sid: schemeId } } : undefined,
        income: incomeId ? { connect: { iid: incomeId } } : undefined,
        central,
        ministry: ministryId ? { connect: { mid: ministryId } } : undefined,
        state: stateId ? { connect: { sid: stateId } } : undefined,
      },
    });

    return NextResponse.json(newExpenditure, { status: 201 });
  } catch (error) {
    console.error("Error creating expenditure:", error);
    return NextResponse.json({ error: (error as Error).message || "Internal Server Error" }, { status: 500 });
  }
}
