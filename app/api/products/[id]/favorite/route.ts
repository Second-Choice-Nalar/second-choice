import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: productId } = await context.params;
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
      return NextResponse.json({ error: "User is not valid" }, { status: 401 });
    }
    const user = session.user;

    const id = user.id;

    const favorite = await prisma.favorite.create({
      data: {
        userId: id,
        productId: productId,
      },
    });
    return NextResponse.json(favorite, { status: 201 });
  } catch (error: unknown) {
    console.error("ERROR CREATING PRODUCT", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
