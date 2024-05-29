// /api/search.js
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const POST = async (req, res) => {
  try {
    const { searchTerm } = await req.json();

    if (!searchTerm) {
      return NextResponse.json({ error: "Search term is required" }, { status: 400 });
    }

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
            },
          },
          {
            categories: {
              contains: searchTerm,
            },
          },
        ],
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error searching posts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
};
