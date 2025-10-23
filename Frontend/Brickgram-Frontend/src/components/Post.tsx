import { Avatar } from "@heroui/react";
import { IconClockHour7, IconHeart, IconMessage } from "@tabler/icons-react";
import React from "react";

function Post() {
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

      {/* Sağ: İçerik */}
      <div className="ml-4 flex flex-col flex-1">
        {/* Kullanıcı ismi */}
        <div className="flex flex-row gap-2">
          <h3 className="font-semibold text-foreground cursor-pointer">
            Utku Gülmez
          </h3>
          <h3 className="text-gray-500">@utkug</h3>
          <div className="mt-0.5 -mr-2 flex items-center justify-center">
            <IconClockHour7 stroke={2} size={18} className="text-gray-500" />
          </div>{" "}
          <h3 className="text-gray-500">18m</h3>
        </div>

        {/* Post metni */}
        <p className="text-sm text-gray-300 mt-1">
          Just built my first LEGO Starfighter 🚀💛 The yellow bricks are
          finally complete!
        </p>

        {/* Beğeni ve yorumlar */}
        <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
          <IconHeart stroke={2} />
          <span>253</span>
          <IconMessage className="ml-5" stroke={2} />
          <span>47</span>
        </div>
      </div>
    </div>
  );
}

export default Post;
