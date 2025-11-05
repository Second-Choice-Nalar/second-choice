import { authClient } from "@/lib/auth-client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    //validasi
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing Fields" }, { status: 400 });
    }

    const user = await authClient.signUp.email({
      name,
      email,
      password,
    });

    return NextResponse.json(
      {
        message: "User Created",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("sign up error", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
