import { connectDb } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

connectDb();

export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json();

        const user = await User.findOne({email: reqBody.email})

        if(!user){
            throw new Error('User does not exist!');
        }

        const validPassword = await bcrypt.compare(reqBody.password, user.password);

        if(!validPassword){
            throw new Error("Invalid password!");
        }

        const dataToBeSigned = {
            userId: user._id,
            email: user.email,
        }

        const token = jwt.sign(dataToBeSigned, process.env.JWT_SECRET!, {
            expiresIn: '1d'
        })

        const response = NextResponse.json({message: "Login succesfful"}, {status: 200});

        response.cookies.set("token", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 1000,
        });

        return response; 
    } catch (error: any) {
        return NextResponse.json({ message: error.message}, {status: 500})
    }
}