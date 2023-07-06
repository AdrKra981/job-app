import { connectDb } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from 'bcryptjs';

connectDb();

export async function POST(req: NextRequest){
    try {
        const reqBody = await req.json();

        const user = await User.findOne({email: reqBody.email})

        if(user){
            throw new Error('User with that email already exists in database!')
        }
        
        const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT));
        const hashedPassword = await bcrypt.hash(reqBody.password, salt);
        reqBody.password = hashedPassword;

        await User.create(reqBody);
        return NextResponse.json({message: 'User created succesfull', success: true}, {status: 201})  
    } catch (error: any) {
        return NextResponse.json({ message: error.message}, {status: 500})
    }
    // return NextResponse.json({message: 'users/register accesss with post method'})
}