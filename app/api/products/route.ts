import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products = await prisma.product.findMany({
    take: 50,
    include: { images: true, seller: true, campus: true },
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      productName,
      description,
      price,
      sellerId,
      campusId,
      locationId,
      categoryId,
      images,
    } = body;

    if (
      !productName ||
      !description ||
      !price ||
      !sellerId ||
      !campusId ||
      !locationId ||
      !categoryId ||
      !images
    ) {
      return NextResponse.json(
        { error: "Missing Required Fields" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        productName,
        description,
        price: Number(price),
        sellerId,
        campusId,
        locationId,
        categoryId,
        images: {
          create:
            images?.map((img: { url: string }) => ({ url: img.url })) || [],
        },
      },
      include: { images: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
