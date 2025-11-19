import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        images: {
          select: {
            url: true,
          },
        },
        campus: {
          select: {
            name: true,
          },
        },
        seller: {
          select: {
            name: true,
            id: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}
