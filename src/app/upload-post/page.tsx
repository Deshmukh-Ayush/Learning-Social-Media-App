"use client";

import { Metadata } from "next";
import PostComponent from "@/components/PostComponent";

export const metadata: Metadata = {
  title: "Create Post",
  description: "Create a new post",
};

export default function CreatePostPage() {
  return (
    <div className="container max-w-4xl py-8">
      <PostComponent />
    </div>
  );
}