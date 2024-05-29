import prisma from "@/lib/prisma";
import { authorization } from "../middleware";
import { NextResponse } from "next/server";

export const GET = authorization (async (req, res) => {
    try {
        
        const userPosts = await prisma.Post.findMany({
            where : {
                authorId : req.user.userId
            },
            include : {
                author : true
            }
        })

        return NextResponse.json(userPosts);

    } catch (error) {
        return NextResponse.json({ error},{status : 500});
    }
})