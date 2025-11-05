import { Tooltip } from "@heroui/react";
import { IconHeart, IconHeartFilled, IconCaretDownFilled } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import PostingPost from "./PostingPost";
import { deleteCommentLike, likeComment } from "@/api/like"; // ✅ sadece likeComment yeterli

/* ❤️ Dinamik LikeButton (yorumlar için) */
function LikeButton({
  commentId,
  initialCount = 0,
  initialLiked = false,
  onToggle,
}: {
  commentId: string;
  initialCount?: number;
  initialLiked?: boolean;
  onToggle?: () => Promise<void>;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [hover, setHover] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setLiked(initialLiked);
    setCount(initialCount);
  }, [initialLiked, initialCount]);

  const toggleLike = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const prevLiked = liked;
    const prevCount = count;

    // Optimistic update
    setLiked(!liked);
    setCount((prev) => (liked ? prev - 1 : prev + 1));

    try {
      if (liked) {
        await deleteCommentLike(commentId)
      }
      else {
        await likeComment(commentId);
      }

      if (onToggle) await onToggle();
    } catch (err) {
      setLiked(prevLiked);
      setCount(prevCount);
      console.error("Yorumu beğenirken hata:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip content={liked ? "Beğeniyi geri al" : "Beğen"} placement="top">
      <div
        onClick={toggleLike}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={`flex items-center gap-1 cursor-pointer select-none transition ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        {liked ? (
          <IconHeartFilled
            size={18}
            className={`text-pink-500 fill-current transition-transform duration-200 ${
              hover ? "scale-110" : "scale-100"
            }`}
          />
        ) : (
          <IconHeart
            size={18}
            className={`transition-colors duration-200 ${
              hover ? "text-pink-400" : "text-gray-400"
            }`}
          />
        )}
        <span
          className={`text-sm transition-colors duration-200 ${
            liked ? "text-pink-500" : hover ? "text-pink-400" : "text-gray-400"
          }`}
        >
          {count}
        </span>
      </div>
    </Tooltip>
  );
}

/* 🧩 Ortak kart componenti */
export interface UserContentCardProps {
  type?: "post" | "comment" | "reply";
  name: string;
  username: string;
  text: string;
  avatar: string;
  time: string;
  fullTime: string;
  postId?: string;
  commentId?: string;
  onReplySuccess?: () => void;
  onReplyClickFromChild?: (username: string) => void;
  replies?: UserContentCardProps[];
  likeCount?: number;        // ✅ backend’den gelen beğeni sayısı
  hasLiked?: boolean;        // ✅ kullanıcı beğenmiş mi
  onLikeToggle?: () => Promise<void>;
}

export default function UserContentCard({
  type = "comment",
  name,
  username,
  text,
  avatar,
  time,
  fullTime,
  postId,
  commentId,
  onReplySuccess,
  onReplyClickFromChild,
  replies = [],
  likeCount = 0,
  hasLiked = false,
  onLikeToggle,
}: UserContentCardProps) {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyToUser, setReplyToUser] = useState("");

  const avatarSize = type === "post" ? "12" : type === "comment" ? "10" : "8";

  const handleReplyClick = (uname: string) => {
    if (type === "reply" && onReplyClickFromChild) {
      onReplyClickFromChild(uname);
    } else {
      setReplyToUser(`@${uname} `);
      setShowReplyBox(true);
      setShowReplies(true);
    }
  };

  const handleCancelReply = () => {
    setShowReplyBox(false);
    setReplyToUser("");
  };

  const handleReplySuccess = () => {
    setShowReplyBox(false);
    setReplyToUser("");
    if (onReplySuccess) onReplySuccess();
  };

  const canShowReplyBox = type === "comment";

  return (
    <div
      className={`flex w-full p-4 ${type !== "reply" ? "border-b border-gray-700" : ""}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img
          src={avatar}
          alt="avatar"
          className={`w-${avatarSize} h-${avatarSize} rounded-full cursor-pointer`}
        />
      </div>

      {/* İçerik */}
      <div className="ml-4 flex flex-col flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground cursor-pointer hover:underline">
            {name}
          </h3>
          <h3 className="text-gray-500 cursor-pointer">@{username}</h3>
          <Tooltip content={fullTime} placement="top">
            <span className="text-gray-500 text-sm cursor-default">• {time}</span>
          </Tooltip>
        </div>

        <p className="text-sm text-gray-300 mt-1">{text}</p>

        {/* Aksiyonlar */}
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
          {commentId && (
            <LikeButton
              commentId={commentId}
              initialCount={likeCount}
              initialLiked={hasLiked}
              onToggle={onLikeToggle}
            />
          )}
          <span>•</span>
          <span
            onClick={() => handleReplyClick(username)}
            className="cursor-pointer hover:text-success transition"
          >
            Yanıtla
          </span>
        </div>

        {/* Yanıtlar */}
        {replies.length > 0 && type !== "reply" && (
          <span
            onClick={() => setShowReplies(!showReplies)}
            className="inline-flex items-center gap-1 w-fit cursor-pointer text-gray-400 hover:text-success mt-2"
          >
            <IconCaretDownFilled size={14} />
            <span>{replies.length} Yanıt</span>
          </span>
        )}

        {/* Alt yorumlar */}
        {showReplies &&
          replies.map((reply, idx) => (
            <UserContentCard
              key={idx}
              {...reply}
              type="reply"
              postId={postId}
              onReplySuccess={onReplySuccess}
              onReplyClickFromChild={handleReplyClick}
            />
          ))}

        {/* Cevap yazma alanı */}
        {canShowReplyBox && showReplyBox && (
          <div className="mt-4">
            <PostingPost
              type="reply"
              postId={postId!}
              parentId={commentId!}
              defaultText={replyToUser}
              onSuccess={handleReplySuccess}
              onCancel={handleCancelReply}
            />
          </div>
        )}
      </div>
    </div>
  );
}
