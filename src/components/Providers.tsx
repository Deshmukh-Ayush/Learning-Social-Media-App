"use client"

import React from "react";
import { ImageKitProvider } from "imagekitio-next";
import axios from "axios";
import { SessionProvider } from "next-auth/react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

export default function Providers({ children }: { children: React.ReactNode }) {
  const authenticator = async () => {
    try {
      const response = await axios.get("/api/imagekit-auth");
      const { signature, expire, token } = response.data;
      return { signature, expire, token };

    } catch (error) {
      let errorMessage = "Authentication request failed";

      if (axios.isAxiosError(error) && error.response) {
        errorMessage += `: ${error.response.status} ${error.response.statusText}`;
      } else if (error instanceof Error) {
        errorMessage += `: ${error.message}`;
      }
      
      console.error(errorMessage, error);
      throw new Error(errorMessage);
    }
  };
  return (
    <SessionProvider>
      <ImageKitProvider
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
