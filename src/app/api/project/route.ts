import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { v4 as uuidv4 } from "uuid";
import createImgbbUrl from "@/app/api/helpers/imgbbFileUpload";

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      name,
      desc,
      start,
      end,
      status,
      photos,
      central,
      localIds,
      ministryId,
      stateIds,
    } = await req.json(); // Parse JSON body

    if (central && stateIds.length === 0 && localIds.length === 0 && !ministryId) {
      return NextResponse.json(
        { error: "Either stateIds, localIds, or ministryId is needed when central is true" },
        { status: 400 }
      );
    }
    if (!central && stateIds.length === 0 && localIds.length === 0) {
      return NextResponse.json(
        { error: "Central is false, but no stateId or localId given" },
        { status: 400 }
      );
    }
    if (stateIds.length > 1 && ministryId) {
      return NextResponse.json(
        { error: "To create a Project under a state ministry, stateIds array should have only 1 item" },
        { status: 400 }
      );
    }

    const pid = uuidv4();

    // Upload photos and transform them
    const transformedPhotos = await Promise.all(
      photos.map(async (image: { desc: string; photo: string }) => {
        const { desc, photo } = image;
        const url = (await createImgbbUrl(photo))?.url as string;
        return { desc, photo: url };
      })
    );

    // Create new project
    const newProject = await prisma.project.create({
      data: {
        pid,
        name,
        desc,
        start,
        end: end || null,
        status,
        photos: transformedPhotos,
        central,
        localIds: localIds.length > 0 ? localIds : undefined,
        stateIds: stateIds.length > 0 ? stateIds : undefined,
        ministryId: ministryId || null,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
