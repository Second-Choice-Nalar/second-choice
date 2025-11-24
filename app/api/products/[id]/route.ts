import { auth } from "@/lib/auth";
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
    console.error(error);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log("hit");
  const { id } = await params;

  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }

    const user = session.user;
    const formData = await req.formData();

    const productName = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const categoryId = formData.get("category") as string;
    const campusId = formData.get("campus") as string;
    const stock = formData.get("stock") as string;

    const existingProduct = await prisma.product.findUnique({
      where: { id: id },
    });

    if (!existingProduct || existingProduct.sellerId !== user.id) {
      return NextResponse.json(
        { error: "Product not found or unauthorized" },
        { status: 404 }
      );
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        productName: productName || existingProduct.productName,
        description: description || existingProduct.description,
        price: price ? parseInt(price) : existingProduct.price,
        stock: stock ? parseInt(stock) : existingProduct.stock,
        categoryId: categoryId
          ? parseInt(categoryId)
          : existingProduct.categoryId,
        campusId: campusId || existingProduct.campusId,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("ERROR UPDATING PRODUCT", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
