import { getUser } from "@/api/user";
import Post from "@/components/Post";
import FollowButton from "@/components/user/FollowButton";
import UserInfo from "@/components/user/UserInfo";
import UserProfileHeader from "@/components/user/UserProfileHeader";
import UserStats from "@/components/user/UserStats";
import { Image, Divider } from "@heroui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconLock } from "@tabler/icons-react";


function UserProfile() {
  const { username } = useParams()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser(username!)
        setUser(data)
      } catch (error) {
        
      }
    }
    fetchUser()
  }, [username])

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center w-full md:w-1/2 min-h-screen border border-b-0 border-gray-700">
        <Image className="rounded-none h-45 w-screen" src="./snoppyX.jpg" />
        <UserProfileHeader profile_picture={user?.profile_picture} />
        <UserInfo username={user?.username} name={user?.name} bio={user?.bio} location={user?.location} is_verified={user?.is_verified}/> 
        <FollowButton onFollowChange={(newFollowing: boolean) => {setUser((prev) => prev ? {...prev, isFollowing: newFollowing, followersCount: prev.followersCount + (newFollowing ? 1 : -1)}: prev)}} user={user} />
        <UserStats followersCount={user?.followersCount} followingCount={user?.followingCount} userId={user?.id}/>
        <Divider className="mt-5" />
        { (!user?.isOwnProfile && user?.is_private && user.isFollowing && !(user.followStatus === 'ACCEPTED')) ? (
          <IconLock />
        ) : (<Post />)}
      </div>
    </div>
  );
}

export default UserProfile;
