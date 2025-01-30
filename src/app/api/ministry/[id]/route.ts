import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { MinistryInput } from "@/app/constants/backend";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    const state = searchParams.get("state");

    if (id) {
      const ministry = await prisma.ministry.findUnique({
        where: { mid: id },
      });

      if (!ministry) {
        return NextResponse.json({ error: "Ministry not found" }, { status: 404 });
      }

      return NextResponse.json(ministry, { status: 200 });
    }

    if (name) {
      const ministries = await prisma.ministry.findMany({
        where: { name },
      });

      if (!ministries.length) {
        return NextResponse.json({ error: "Ministry not found" }, { status: 404 });
      }

      return NextResponse.json(ministries, { status: 200 });
    }

    if (state) {
      const ministries = await prisma.ministry.findMany({
        where: { state },
      });

      if (!ministries.length) {
        return NextResponse.json({ error: "Ministry not found" }, { status: 404 });
      }

      return NextResponse.json(ministries, { status: 200 });
    }

    return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
  } catch (error) {
    console.error("Error fetching ministry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { central, state, name } = await req.json() as MinistryInput;

    if (!id) {
      return NextResponse.json({ error: "Ministry ID is required" }, { status: 400 });
    }

    const updatedMinistry = await prisma.ministry.update({
      where: { mid: id },
      data: { central, state, name },
    });

    return NextResponse.json(updatedMinistry, { status: 200 });
  } catch (error) {
    console.error("Error updating ministry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Ministry ID is required" }, { status: 400 });
    }

    await prisma.ministry.delete({
      where: { mid: id },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error deleting ministry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
