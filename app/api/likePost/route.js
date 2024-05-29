import { authorization } from "../middleware";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const PUT = authorization(async (req, res) => {
try {
    const { postId } = await req.json();

    if (!postId) {
        return NextResponse.json(
            { error: "Missing required fields" },
            { status: 400 }
        );
    }

    const post = await prisma.post.update({
        where: { id: postId },
        data: { likes: { increment: 1 } },
    });

    return NextResponse.json({
        message: "Post liked successfully!",
        likes: post.likes,
    });
    } 
    catch (error) {
    console.error("Error liking post:", error);
    return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 }
    );
}
});
