import { useState } from "react";
import FollowersCard from "./FollowersCard";
import { Button, useDisclosure } from "@heroui/react";
import FollowingsCard from "./FollowingsCard";

interface UserStatsInput {
  userId?: string
  followersCount?: number
  followingCount?: number
  postCount?: number
}

function UserStats({userId, followersCount, followingCount}: UserStatsInput) {
  const {isOpen: isFollowersOpen, onOpen: onFollowersOpen,onOpenChange: onFollowersOpenChange} = useDisclosure();

  const { isOpen: isFollowingOpen, onOpen: onFollowingOpen, onOpenChange: onFollowingOpenChange } = useDisclosure();
  
  return (
        <div className="w-full flex flex-row justify-between text-center mt-8">
          <div className="flex-1 cursor-pointer" onClick={onFollowingOpen}>
            <h2 className="font-semibold text-xl text-yellow-400">{followingCount}</h2>
            <p className="text-gray-400 text-sm font-semibold">Following</p>
            <FollowingsCard userId={userId} isOpen={isFollowingOpen} onOpenChange={onFollowingOpenChange}/>
          </div>
          <div className="inline-block w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
          <div className="flex-1 cursor-pointer"  onClick={onFollowersOpen}>
            <h2 className="font-semibold text-xl text-blue-400">{followersCount}</h2>
            <p className="text-gray-400 text-sm font-semibold">Followers</p>
            <FollowersCard userId={userId} isOpen={isFollowersOpen} onOpenChange={onFollowersOpenChange}/>
          </div>
          <div className="inline-block w-0.5 self-stretch bg-neutral-100 dark:bg-white/10"></div>
          <div className="flex-1">
            <h2 className="font-semibold text-xl text-red-500">253</h2>
            <p className="text-gray-400 text-sm font-semibold">Posts</p>
          </div>
        </div>
  )
}

export default UserStats