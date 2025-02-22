import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password, username, fullName } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please enter a valid email and password" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({email});

    if(existingUser) {
        return NextResponse.json(
            {error: "Email Already exists"},
            {status: 400}
        )
    }

    await User.create({
        email,
        password,
        username,
        fullName
    })

    return NextResponse.json(
        {message: "User registered Successfully"},
        {status: 201}
    )

  } catch (error) {
    return NextResponse.json(
        {error: `Error registering the user. Error goes by ${error}`},
        {status: 500}
    )
  }
}
