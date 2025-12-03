import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // const rawHeaders = await headers();
  // console.log("Headers:", Object.fromEntries(rawHeaders.entries()));
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
      return NextResponse.json({ error: "User is not valid" }, { status: 401 });
    }

    const user = session.user;

    const id = user.id;

    const profile = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        campus: true,
        location: true,
      },
    });
    console.log(profile);
    return NextResponse.json(profile);
  } catch (err) {
    console.error("GET PROFILE ERROR:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
      return NextResponse.json({ error: "User is not valid" }, { status: 401 });
    }

    const user = session.user;
    const id = user.id;

    const body = await req.json();
    const { name, phoneNumber, locationId, campusId } = body;

    if (!name || !phoneNumber || !locationId || !campusId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedProfile = await prisma.user.update({
      where: {
        id: id,
      },
      data: { name, phoneNumber, locationId, campusId },
    });

    return NextResponse.json(updatedProfile);
  } catch (err) {
    console.error("UPDATE PROFILE ERROR:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
