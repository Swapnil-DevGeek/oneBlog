import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authorization } from "../middleware";

export const DELETE = authorization(async (req, res) => {
    try {
        const {id} = await req.json();
        const post = await prisma.Post.delete({
            where : {
                id,
                authorID : req.user.userID
            }
        })
        return NextResponse.json(post,{
            message : "Post deleted successfully!"
        });

    } catch (error) {
        return NextResponse.json({message : error.message})
    }
})