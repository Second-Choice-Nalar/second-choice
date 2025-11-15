import { Category } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const categories: Category[] = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });

  return NextResponse.json(categories, { status: 200 });
}
