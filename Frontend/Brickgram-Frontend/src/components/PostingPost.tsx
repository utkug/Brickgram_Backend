import { createPost } from "@/api/post";
import { createComment } from "@/api/comment"; // 🔹 Import comment API
import { handleApiError } from "@/utils/handleApiError";
import { Button, CircularProgress, Textarea } from "@heroui/react";
import { IconPhotoUp, IconX } from "@tabler/icons-react";
import React, { useEffect, useRef, useState } from "react";

interface PostingPostInput {
  type: "post" | "comment" | "reply";
  defaultText?: string;
  onCancel?: () => void;
  postId?: string; // 🔹 Required for comments and replies
  parentId?: string; // 🔹 Required for replies (parent comment id)
  onSuccess?: () => void; // 🔹 Callback after successful submission
}

function PostingPost({ 
  type, 
  defaultText = "", 
  onCancel,
  postId,
  parentId,
  onSuccess
}: PostingPostInput) {
  const [postText, setPostText] = useState(defaultText);
  const [expanded, setExpanded] = useState(type !== "comment"); // 🔹 sadece comment için başta küçük
  const [postImageUrl, setPostImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null); // dışarı tıklama takibi için
  const postMediaInputRef = useRef<HTMLInputElement | null>(null);

  // 🔹 Debug: Log props on mount
  useEffect(() => {
    console.log("PostingPost props:", { type, postId, parentId });
  }, [type, postId, parentId]);

  const MAX_LENGTH = 300;
  const remainingChars = MAX_LENGTH - postText.trim().length;
  const progressValue = (postText.trim().length / MAX_LENGTH) * 100;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPostImageUrl(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setPostImageUrl("");
    if (postMediaInputRef.current) postMediaInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (type === "post") {
        // 🔹 POST: Use existing createPost API
        await createPost({ post_text: postText });
      } else if (type === "comment") {
        // 🔹 COMMENT: Create top-level comment (no parent_id)
        if (!postId) {
          console.error("Missing postId for comment:", { type, postId, parentId });
          throw new Error("Post ID is required for comments");
        }
        await createComment({
          post_id: postId,
          comment_text: postText
        });
      } else if (type === "reply") {
        // 🔹 REPLY: Create reply with parent_id
        if (!postId) {
          console.error("Missing postId for reply:", { type, postId, parentId });
          throw new Error("Post ID is required for replies");
        }
        if (!parentId) {
          console.error("Missing parentId for reply:", { type, postId, parentId });
          throw new Error("Parent ID is required for replies");
        }
        await createComment({
          post_id: postId,
          comment_text: postText,
          parent_id: parentId
        });
      }

      // Reset form
      setPostText("");
      setPostImageUrl("");
      setExpanded(false);
      
      // Call success callback
      if (onSuccess) onSuccess();
      if (onCancel) onCancel();
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setExpanded(false);
    setPostText("");
    setPostImageUrl("");
    if (onCancel) onCancel();
  };

  /* ------------------ 🧠 DIŞ TIKLAMAYI YAKALA ------------------ */
  useEffect(() => {
    if (type !== "comment" || !expanded) return; // sadece comment + açıkken çalışır

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        // sadece input boşsa kapanır
        if (!postText.trim() && !postImageUrl) setExpanded(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [expanded, type, postText, postImageUrl]);

  /* ------------------------------------------------------------- */

  const isComment = type === "comment";
  const isReply = type === "reply";

  // 🔹 Get appropriate placeholder text
  const getPlaceholder = () => {
    if (type === "reply") return "Answer...";
    if (type === "comment") return "Comment...";
    return "What's on your mind?";
  };

  // 🔹 Get appropriate button text
  const getButtonText = () => {
    if (type === "reply") return "Reply";
    if (type === "comment") return "Comment";
    return "Post";
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className={`flex flex-row ml-${isReply ? "4" : "0"}`} ref={wrapperRef}>
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src="/LSW_PhotoIcons_KitFisto.png"
            alt="User avatar"
            className={`rounded-full cursor-pointer ${
              isReply ? "w-8 h-8" : "w-12 h-12"
            }`}
          />
        </div>

        {/* Metin alanı */}
        <div className="flex flex-col w-full ml-3">
          <Textarea
            variant={expanded ? "bordered" : "flat"}
            value={postText}
            onValueChange={setPostText}
            size="lg"
            placeholder={getPlaceholder()}
            minRows={expanded ? 4 : 1}
            className={`transition-all duration-300 ${
              expanded ? "h-28" : "h-10"
            }`}
            onFocus={() => setExpanded(true)}
          />

          {/* 🔽 Butonlar sadece expanded durumda görünür */}
          {expanded && (
            <>
              {postImageUrl && (
                <div className="relative mt-3 w-fit">
                  <img src={postImageUrl} className="rounded-2xl" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black/60 cursor-pointer rounded-sm"
                  >
                    <IconX className="text-white" size={16} />
                  </button>
                </div>
              )}

              <div className="flex justify-between items-center gap-3 mt-3">
                <div className="flex items-center gap-3">
                  {/* 🔹 Only show image upload for posts, not comments/replies */}
                  {type === "post" && (
                    <>
                      <IconPhotoUp
                        className="cursor-pointer text-green-500"
                        onClick={() => postMediaInputRef.current?.click()}
                      />
                      <input
                        className="hidden"
                        type="file"
                        ref={postMediaInputRef}
                        onChange={handleImageChange}
                        accept="image/*,video/*"
                      />
                    </>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-sm ${
                      remainingChars < 0 ? "text-danger" : "text-gray-400"
                    }`}
                  >
                    {remainingChars}
                  </span>
                  <CircularProgress
                    color={remainingChars < 0 ? "danger" : "success"}
                    size="sm"
                    value={progressValue}
                  />
                  <Button
                    type="submit"
                    color="success"
                    className="w-auto text-md"
                    isLoading={isLoading}
                    isDisabled={
                      !postText.trim() || remainingChars < 0
                    }
                  >
                    {getButtonText()}
                  </Button>
                  <Button
                    type="button"
                    color="danger"
                    variant="flat"
                    className="w-auto text-md"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
}

export default PostingPost;