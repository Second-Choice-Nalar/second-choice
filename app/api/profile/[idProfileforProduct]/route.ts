import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { idProfileforProduct: string } }
) {
  const { idProfileforProduct } = await params;

  if (!idProfileforProduct) {
    return new NextResponse("Seller ID is required", { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: {
      sellerId: idProfileforProduct,
    },
    include: {
      images: {
        select: {
          url: true,
        },
      },
    },
  });

  return NextResponse.json(products);
}
