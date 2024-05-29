import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const authorization = (handler) => async (req,res) => {
    const token = req.headers.get('Authorization');

    if(!token){
        return NextResponse.json({message : "Invalid authorization"},{status: 401});
    }

    try {
        const decoded = jwt.verify(token,process.env.NEXT_PUBLIC_JWT_SECRET)
        req.user = decoded;
        return handler(req);
    } catch (error) {
        return NextResponse.json({message : "Invalid token"},{status:401});
    }
};