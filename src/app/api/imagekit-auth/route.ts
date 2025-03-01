import { NextResponse } from "next/server";
import Imagekit from "imagekit";

const imagekit = new Imagekit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function GET() {
    return NextResponse.json(imagekit.getAuthenticationParameters())
}
