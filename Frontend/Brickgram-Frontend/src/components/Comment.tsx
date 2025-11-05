import { Avatar, Tooltip } from "@heroui/react";
import {
  IconCaretDownFilled,
  IconHeart,
  IconHeartFilled,
  IconMessage,
} from "@tabler/icons-react";
import React, { useState } from "react";
import PostingPost from "./PostingPost";

/* ------------------ ❤️ Like Butonu ------------------ */
function LikeButton({ initialCount = 253 }: { initialCount?: number }) {
  const [liked, setLiked] = useState(false);
  const [hover, setHover] = useState(false);
  const [count, setCount] = useState(initialCount);

  const toggleLike = () => {
    setLiked(!liked);
    setCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div
      onClick={toggleLike}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex items-center gap-1 cursor-pointer select-none transition"
    >
      {liked ? (
        <IconHeartFilled
          size={20}
          className={`text-pink-500 transition-transform duration-200 ${
            hover ? "scale-110" : "scale-100"
          }`}
        />
      ) : (
        <IconHeart
          size={20}
          className={`transition-colors duration-200 ${
            hover ? "text-pink-500" : "text-gray-400"
          }`}
        />
      )}
      <span
        className={`text-sm transition-colors duration-200 ${
          liked ? "text-pink-500" : hover ? "text-pink-500" : "text-gray-400"
        }`}
      >
        {count}
      </span>
    </div>
  );
}



/* ------------------ 🧩 Yorum Bileşeni ------------------ */
function Comment() {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [replyToUser, setReplyToUser] = useState("");

  // 🔹 Comment butonuna basınca yorum alanını aç
  const handleCommentClick = () => {
    setShowReplyBox(true);
    setReplyToUser(""); // direkt yeni yorum kutusu
  };

  // 🔹 Yanıtla fonksiyonu
  const handleReplyClick = (username: string) => {
    setReplyToUser(`@${username} `);
    setShowReplyBox(true);
    setShowReplies(true);
  };

  const handleCancelReply = () => {
    setShowReplyBox(false);
    setReplyToUser("");
  };

  return (
    <div className="flex w-full p-4 border-b border-gray-700">
      {/* Sol: Avatar */}
      <div className="flex-shrink-0">
        <img
          src="./LSW_PhotoIcons_KitFisto.png"
          alt="User avatar"
          className="w-12 h-12 rounded-full cursor-pointer"
        />
      </div>

      {/* Sağ taraf */}
      <div className="ml-4 flex flex-col flex-1">
        {/* Kullanıcı bilgisi */}
        <div className="flex flex-row gap-2 items-center">
          <h3 className="font-semibold text-foreground cursor-pointer hover:underline">
            Utku Gülmez
          </h3>
          <h3 className="text-gray-500 cursor-pointer hover:underline">
            @utkug
          </h3>
          <Tooltip
            content={"Nov 3, 2025, 14:42"}
            placement="top"
            className="text-xs"
          >
            <span className="text-gray-500 text-sm cursor-default">• 5m</span>
          </Tooltip>
        </div>

        {/* Ana yorum metni */}
        <p className="text-sm text-gray-300 mt-1">
          Just built my first LEGO Starfighter 🚀💛 The yellow bricks are finally
          complete!
        </p>

        {/* Beğeni ve aksiyon menüsü */}
        <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
          <LikeButton />
          <span>•</span>
          <span
            onClick={() => handleReplyClick("Utkug07")}
            className="cursor-pointer hover:text-success transition"
          >
            Yanıtla
          </span>
        </div>

        {/* "4 Yanıt" kısmı */}
        <span
          onClick={() => setShowReplies(!showReplies)}
          className="inline-flex items-center gap-1 w-fit cursor-pointer text-gray-400 hover:text-success mt-2"
        >
          <IconCaretDownFilled size={14} />
          <span>4 Yanıt</span>
        </span>

        {/* Alt Yorumlar */}
        {showReplies && (
          <div className="flex flex-col mt-3 gap-3 ml-2">
            {/* 🔹 Alt yorum header */}
            <div className="flex items-center gap-3">
              <Avatar
                src="./LSW_PhotoIcons_KitFisto.png"
                size="sm"
                className="cursor-pointer border border-success/40"
              />
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-foreground cursor-pointer hover:underline">
                    Utku
                  </p>
                  <p className="text-gray-500 text-sm cursor-pointer hover:underline">
                    @Utkug07
                  </p>
                  {/* 🕒 Tooltip eklendi */}
                  <Tooltip
                    content={"Nov 3, 2025, 15:02"}
                    placement="top"
                    className="text-xs"
                  >
                    <span className="text-gray-500 text-xs cursor-default">
                      • 2m
                    </span>
                  </Tooltip>
                </div>
              </div>
            </div>

            {/* Alt yorum metni */}
            <div className="flex flex-col ml-11 -mt-4">
              <p className="text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
                error ratione praesentium omnis necessitatibus, beatae aliquam
                rerum odio fuga culpa quis sapiente in numquam assumenda commodi.
              </p>

              {/* Alt yorum beğeni & yanıt */}
              <div className="flex items-center gap-3 mt-2 text-sm text-gray-400">
                <LikeButton />
                <span
                  onClick={() => handleReplyClick("Utkug07")}
                  className="cursor-pointer hover:text-success ml-2"
                >
                  Yanıtla
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 🧩 Cevap yazma alanı */}
        {showReplyBox && (
          <div className="mt-4">
            <PostingPost
              type="reply"
              defaultText={replyToUser}
              onCancel={handleCancelReply}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Comment;
