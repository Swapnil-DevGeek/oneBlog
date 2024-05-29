import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

/*

TODO:

    -add post form ✅
    -profile section : all posts by user ✅
    -update and delete post route ✅ : profile -> edit and delete button for each post ✅
    -libraries section : all saved posts by user
    -specefic post route ✅
    -search functionalities

*/

export async function GET(req, res) {

    const posts = await prisma.Post.findMany({
        include : {
            author : true
        }
    });

    return NextResponse.json(posts,{
        status : 200
    })
 

}