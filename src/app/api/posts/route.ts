import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Post from "@/models/Post";
import User from "@/models/User";
import { postSchema } from "@/schemas/postsSchema";
import dbConnect from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        await dbConnect()
        
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const body = await req.json();
        const validation = postSchema.safeParse(body);
        
        if (!validation.success) {
            return NextResponse.json(
                { error: "Invalid data", details: validation.error.format() },
                { status: 400 }
            );
        }
        
        const { content, mediaUrl } = validation.data;
        const userId = session.user.id;
        
        const post = await Post.create({
            content,
            mediaUrl,
            userId,
            likes: [],
            comments: []
        });
        
        await User.findByIdAndUpdate(
            userId,
            { $inc: { postCount: 1 } },
            { new: true }
        );
        
        return NextResponse.json({ 
            success: true, 
            post 
        }, { status: 201 });
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}