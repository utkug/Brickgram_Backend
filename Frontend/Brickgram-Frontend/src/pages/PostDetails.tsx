import PostingPost from "@/components/PostingPost";
import UserContentCard from "@/components/UserContentCard";
import { getPostDetails } from "@/api/post";
import { getCommentsByPost } from "@/api/comment";
import { likePost, deletePostLike } from "@/api/like";
import {
  IconHeart,
  IconHeartFilled,
  IconMessage,
  IconShare2,
  IconEdit,
  IconTrash,
  IconLink,
  IconBookmark,
  IconX,
} from "@tabler/icons-react";
import {
  Tooltip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";

/* ❤️ Dinamik Like Butonu */
function LikeButton({
  initialCount = 0,
  initialLiked = false,
  onToggle,
}: {
  initialCount?: number;
  initialLiked?: boolean;
  onToggle: () => Promise<void>;
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

    // Optimistic UI update
    setLiked(!liked);
    setCount(prev => (liked ? prev - 1 : prev + 1));

    try {
      await onToggle();
    } catch (err) {
      // Revert on error
      setLiked(prevLiked);
      setCount(prevCount);
      console.error("Failed to toggle like:", err);
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
            size={22}
            className={`text-pink-500 transition-transform duration-200 ${
              hover ? "scale-110" : "scale-100"
            }`}
          />
        ) : (
          <IconHeart
            size={22}
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

function PostDetails() {
  const { postId } = useParams<{ postId: string }>();
  const commentRef = useRef<HTMLDivElement | null>(null);
  const [showImage, setShowImage] = useState(false);

  // State for post and comments
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- Load post and comments ---------------- */
  const loadPostData = async () => {
    if (!postId) return;
    setLoading(true);
    try {
      const postData = await getPostDetails(postId);
      setPost(postData);

      const commentsData = await getCommentsByPost(postId);
      setComments(commentsData.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to load post");
      console.error("Error loading post:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPostData();
  }, [postId]);

  /* ---------------- Optimizations ---------------- */
  // ✅ Refresh only comments (not the entire post)
  const refreshComments = async () => {
    if (!postId) return;
    try {
      const commentsData = await getCommentsByPost(postId);
      setComments(commentsData.data || []);
      // Güncel yorum sayısını post state’ine de işle
      setPost((prev: any) =>
        prev
          ? {
              ...prev,
              _count: {
                ...prev._count,
                commentPost: commentsData.count || commentsData.data.length,
              },
            }
          : prev
      );
    } catch (err) {
      console.error("Failed to refresh comments:", err);
    }
  };

  // ✅ Optimize post like toggle (no full reload)
  const handlePostLikeToggle = async () => {
    if (!postId || !post) return;

    try {
      if (post.has_liked) {
        await deletePostLike(post.id);
        setPost((prev: any) => ({
          ...prev,
          has_liked: false,
          _count: {
            ...prev._count,
            likePost: prev._count.likePost - 1,
          },
        }));
      } else {
        await likePost(postId);
        setPost((prev: any) => ({
          ...prev,
          has_liked: true,
          _count: {
            ...prev._count,
            likePost: prev._count.likePost + 1,
          },
        }));
      }
    } catch (err) {
      console.error("Failed to toggle post like:", err);
    }
  };

  /* ---------------- Utility ---------------- */
  const scrollToComment = () => {
    commentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("🔗 Gönderi bağlantısı kopyalandı!");
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff}s`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
    return `${Math.floor(diff / 86400)}d`;
  };

  /* ---------------- Render ---------------- */
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error || "Post not found"}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {/* 👤 Kullanıcı Bilgisi */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={post.author?.profile_picture || "/LSW_PhotoIcons_KitFisto.png"}
            alt="Profile"
            className="w-12 h-12 rounded-full border border-gray-500 hover:border-success/50 transition-transform hover:scale-105 cursor-pointer"
          />
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-foreground hover:text-success cursor-pointer transition">
                {post.author?.name || post.author?.username || "Unknown User"}
              </p>
              <p className="text-sm text-gray-500 cursor-pointer">
                @{post.author?.username || "unknown"}
              </p>
            </div>
            <Tooltip content={new Date(post.created_at).toLocaleString()} placement="top">
              <p className="text-xs text-gray-500 cursor-default">
                {formatTime(post.created_at)}
              </p>
            </Tooltip>
          </div>
        </div>

        {/* ⋯ Menü */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button
              isIconOnly
              variant="light"
              radius="full"
              className="text-gray-500 hover:text-success transition"
            >
              ⋯
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Post options">
            <DropdownItem key="edit" startContent={<IconEdit size={16} />}>
              Düzenle
            </DropdownItem>
            <DropdownItem key="delete" startContent={<IconTrash size={16} />} className="text-danger">
              Sil
            </DropdownItem>
            <DropdownItem key="copy" onClick={handleCopyLink} startContent={<IconLink size={16} />}>
              Bağlantıyı Kopyala
            </DropdownItem>
            <DropdownItem key="save" startContent={<IconBookmark size={16} />}>
              Kaydet
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* 🧱 Post İçeriği */}
      <p className="mt-3 text-gray-200 text-[15px] leading-relaxed tracking-wide">
        {post.post_text}
      </p>

      {/* 🖼️ Görsel */}
      {post.image_url && (
        <>
          <div className="relative mt-4 cursor-zoom-in" onClick={() => setShowImage(true)}>
            <img
              className="rounded-xl w-full max-h-[700px] object-contain bg-black/20 shadow-lg transition-transform duration-300 hover:scale-[1.02]"
              src={post.image_url}
              alt="Post media"
            />
          </div>

          {showImage && (
            <div
              onClick={() => setShowImage(false)}
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 cursor-zoom-out"
            >
              <img
                src={post.image_url}
                className="max-w-[90%] max-h-[90%] object-contain rounded-2xl shadow-2xl"
              />
              <button
                onClick={() => setShowImage(false)}
                className="absolute top-6 right-6 text-gray-300 hover:text-white transition"
              >
                <IconX size={30} />
              </button>
            </div>
          )}
        </>
      )}

      {/* ❤️💬 Etkileşimler */}
      <div className="flex items-center gap-5 text-gray-400 mt-5">
        <LikeButton
          initialCount={post._count?.likePost || 0}
          initialLiked={post.has_liked || false}
          onToggle={handlePostLikeToggle}
        />

        <Tooltip content="Yorum yap" placement="top">
          <div
            onClick={scrollToComment}
            className="flex items-center gap-1 hover:text-success transition-colors cursor-pointer"
          >
            <IconMessage stroke={2} size={22} />
            <span className="text-sm">{post._count?.commentPost || 0}</span>
          </div>
        </Tooltip>

        <Tooltip content="Paylaş" placement="top">
          <div className="flex items-center gap-1 hover:text-blue-400 transition-colors cursor-pointer">
            <IconShare2 stroke={2} size={22} />
          </div>
        </Tooltip>
      </div>

      {/* 🧩 Yorum Yazma Alanı */}
      <div className="mt-6 ml-2" ref={commentRef}>
        <PostingPost type="comment" postId={postId} onSuccess={refreshComments} />
      </div>

      <div className="border-t border-gray-700/70 my-6" />

      {/* 💬 Yorumlar */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Henüz yorum yok. İlk yorumu sen yap! 💬
          </p>
        ) : (
          comments.map((comment) => (
            <UserContentCard
              key={comment.id}
              type="comment"
              postId={postId!}
              commentId={comment.id}
              name={comment.user?.name || comment.user?.username || "Unknown"}
              username={comment.user?.username || "unknown"}
              text={comment.comment_text}
              avatar={comment.user?.profile_picture || "/LSW_PhotoIcons_KitFisto.png"}
              time={formatTime(comment.created_at)}
              fullTime={new Date(comment.created_at).toLocaleString()}
              likeCount={comment._count?.likeComment || 0}
              hasLiked={comment.has_liked || false}
              onReplySuccess={refreshComments}
              onLikeToggle={refreshComments}
              replies={
                comment.replies?.map((reply: any) => ({
                  type: "reply",
                  postId,
                  commentId: reply.id,
                  name: reply.user?.name || reply.user?.username || "Unknown",
                  username: reply.user?.username || "unknown",
                  text: reply.comment_text,
                  avatar: reply.user?.profile_picture || "/LSW_PhotoIcons_KitFisto.png",
                  time: formatTime(reply.created_at),
                  fullTime: new Date(reply.created_at).toLocaleString(),
                  likeCount: reply._count?.likeComment || 0,
                  hasLiked: reply.has_liked || false,
                  onLikeToggle: refreshComments,
                })) || []
              }
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PostDetails;
