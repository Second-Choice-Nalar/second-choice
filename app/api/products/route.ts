import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { supabaseService } from "@/lib/supabase-server";
import { headers } from "next/headers";
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
    //Cek session dan dapetin user.id
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }

    const user = session.user;

    //POST FORM
    const formData = await req.formData();

    const productName = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const categoryId = formData.get("category") as string;
    const campusId = formData.get("campus") as string;
    const stock = formData.get("stock") as string;

    const images = formData.getAll("images") as File[];

    if (
      !productName ||
      !description ||
      !price ||
      !stock ||
      !campusId ||
      !categoryId ||
      images.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing Required Fields" },
        { status: 400 }
      );
    }

    // Upload gambar ke Supabase Storage
    const uploadedImages = [];
    for (const file of images) {
      // Checking apakah itu file beneran
      if (file.size === 0) continue;

      //membuat nama file yang mau disimpan agar unik
      const fileExtension = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExtension}`;
      const filePath = `products/${fileName}`;

      // Meng-upload gambar ke Supabase Storage
      const { data, error: uploadError } = await supabaseService.storage
        .from("product-images") // Ganti 'images' dengan nama bucket di Supabase
        .upload(filePath, file, {
          contentType: file.type,
          upsert: false,
        });

      if (uploadError) {
        console.error("Supabase Upload Error", uploadError);
        return NextResponse.json(
          { error: `Error uploading image: ${uploadError.message}` },
          { status: 500 }
        );
      }

      // Mendapatkan URL public untuk gambar yang di-upload
      const { data: publicUrlData } = supabaseService.storage
        .from("product-images")
        .getPublicUrl(data.path);

      if (!publicUrlData || !publicUrlData.publicUrl) {
        return NextResponse.json(
          { error: "Failed to get public URL for uploaded image" },
          { status: 500 }
        );
      }

      uploadedImages.push({ url: publicUrlData.publicUrl });
    }

    const product = await prisma.product.create({
      data: {
        productName,
        description,
        price: parseInt(price),
        stock: parseInt(stock),
        sellerId: user.id,
        campusId,
        categoryId: parseInt(categoryId),
        images: {
          create: uploadedImages,
        },
      },
      include: { images: true },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("ERROR CREATING PRODUCT", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
