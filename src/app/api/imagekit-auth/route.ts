import { NextResponse } from "next/server";
import Imagekit from "imagekit";

const imagekit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function GET() {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters()
    return NextResponse.json(authenticationParameters);
  } catch (error) {
    return NextResponse.json(
      { error: "Imagekit auth failed" },
      { status: 500 }
    );
  }
}
