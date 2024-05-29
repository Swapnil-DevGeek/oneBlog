import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = params;

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: parseInt(id, 10) 
            },
            include: {
                author: true
            }
        });

        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
