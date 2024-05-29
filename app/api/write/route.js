import { NextResponse } from "next/server";
import { authorization } from "../middleware";
import prisma from "@/lib/prisma";

export const POST = authorization(async (req) => {

    const { title,tagline,content,categories } = await req.json();

    try {
        
        const post = await prisma.Post.create({
            data : {
                title,
                tagline,
                content,
                categories,
                authorId : req.user.userId
            }
        })

        return NextResponse.json(post);

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message:"Internal error"},{status : 500});
    }
});
