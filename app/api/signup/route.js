import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export async function POST(req, res) {

    const { name, email, password } = await req.json();

    //check if email is already registered
    const existingUser = await prisma.User.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
      },{
        status: 400,
      });
    }

    //hash the password
    const hashedpassword = await bcrypt.hash(password, 10);

    //create a new User
    const user = await prisma.User.create({
      data: {
        name,
        email,
        password: hashedpassword,
      },
    });

    return NextResponse.json(user, { status: 200 });

}

export async function GET(req) {
  // If you want to handle GET requests, you can add the logic here
  return NextResponse.json({ message: "GET method is not supported for this endpoint" }, { status: 405 });
}
