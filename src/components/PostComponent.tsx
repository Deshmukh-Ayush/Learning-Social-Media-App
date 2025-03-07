"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import FileUpload from "@/components/FileUpload";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function CreatePostForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  if (!session) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p>Please sign in to create a post</p>
        </CardContent>
      </Card>
    );
  }

  const handleFileUploadSuccess = (response: IKUploadResponse) => {
    setMediaUrl(response.url);
    toast.success("File uploaded successfully!");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      toast.error("Post content cannot be empty");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          mediaUrl,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to create post");
      }
      
      toast.success("Post created successfully!");
      setContent("");
      setMediaUrl("");
      router.refresh();
      
      // Optionally redirect to the post or feed
      // router.push("/feed");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create a Post</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            className="min-h-32 resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          <div className="space-y-2">
            <p className="text-sm font-medium">Add media (optional)</p>
            <FileUpload
              onSuccess={handleFileUploadSuccess}
              onProgress={setUploadProgress}
              fileType="image"
            />
            
            {mediaUrl && (
              <div className="relative mt-2 rounded-md overflow-hidden">
                <img
                  src={mediaUrl}
                  alt="Preview"
                  className="w-full h-auto max-h-64 object-cover"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => setMediaUrl("")}
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            disabled={isSubmitting || !content.trim()}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Post...
              </>
            ) : (
              "Create Post"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}