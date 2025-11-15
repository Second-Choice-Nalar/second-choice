import { Campus } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const campuses: Campus[] = await prisma.campus.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return NextResponse.json(campuses, { status: 200 });
}
