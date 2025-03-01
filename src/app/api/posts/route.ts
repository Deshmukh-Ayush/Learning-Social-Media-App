import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const { content, mediaUrl } = await req.json();
    const userId = session?.user?.id;

    if (!content || !userId) {
        return new NextResponse("Invalid request", { status: 400 });
    }
}