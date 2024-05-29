import { authorization } from "../middleware";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const PUT = authorization(async (req, res) =>  {
    try {
        const { id, title, tagline, content, categories } = await req.json();

        // Ensure all required fields are present
        if (!id || !title || !tagline || !content || !categories) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const post = await prisma.Post.update({
            where: {
                id: id,
                authorId: req.user.userId
            },
            data: {
                title,
                tagline,
                content,
                categories,
                authorId: req.user.userId
            }
        });

        return NextResponse.json({message : "Success"});

    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
});
