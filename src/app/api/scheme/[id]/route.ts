import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { SchemeInput } from "@/app/constants/backend";
import createImgbbUrl from "@/app/api/helpers/imgbbFileUpload";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const url = new URL(req.url);
    const name = url.searchParams.get("name");

    if (id) {
      const scheme = await prisma.scheme.findUnique({
        where: { sid: id },
      });

      if (!scheme) {
        return NextResponse.json({ error: "Scheme not found" }, { status: 404 });
      }

      return NextResponse.json(scheme, { status: 200 });
    }

    if (name) {
      const schemes = await prisma.scheme.findMany({
        where: { name },
      });

      if (!schemes || schemes.length === 0) {
        return NextResponse.json({ error: "Scheme not found" }, { status: 404 });
      }

      return NextResponse.json(schemes, { status: 200 });
    }

    return NextResponse.json({ error: "Scheme ID or name is required" }, { status: 400 });
  } catch (error) {
    console.error("Error fetching scheme:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, desc, central, start, end, status, photos } = await req.json() as SchemeInput;

    if (!id) {
      return NextResponse.json({ error: "Scheme ID is required" }, { status: 400 });
    }

    const transformedPhotos = await Promise.all(
      photos.map(async (image) => {
        const { desc, photo } = image;
        const url = (await createImgbbUrl(photo))?.url as string;
        return { desc, photo: url };
      })
    );

    const updatedScheme = await prisma.scheme.update({
      where: { sid: id },
      data: {
        name,
        desc,
        central,
        start,
        end,
        status,
        photos: transformedPhotos,
      },
    });

    return NextResponse.json(updatedScheme, { status: 200 });
  } catch (error) {
    console.error("Error updating scheme:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ error: "Scheme ID is required" }, { status: 400 });
    }

    await prisma.scheme.delete({
      where: { sid: id },
    });

    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    console.error("Error deleting scheme:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
