import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const {email,password} = await req.json();

    const user = await prisma.User.findUnique({
        where : {
            email
        }
    })

    if(!user)
        return NextResponse.json({message: "User not found"},{status : 400});
    
    const isPasswordvalid = await bcrypt.compare(password,user.password);
    
    if(!isPasswordvalid)
        return NextResponse.json({message: "Invalid Password"},{status : 400});

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id , username : user.name, email : user.email}, process.env.NEXT_PUBLIC_JWT_SECRET, {
        expiresIn: '1h',
    });

    return NextResponse.json({token}, {
        status: 200,
    });

}

export async function GET(req, res){
    return NextResponse.json({message: "method not allowed"})
}