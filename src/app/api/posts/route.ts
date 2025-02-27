import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { postSchema } from "@/schemas/postsSchema";

export async function POST(req: NextRequest) {
    const { content, mediaUrl } = await req.json();
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!content || !userId) {
        return new NextResponse("Invalid request", { status: 400 });
    }
}