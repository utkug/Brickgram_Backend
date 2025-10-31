import { getUserFollowPendingList, updateFollow } from "@/api/user";
import { Avatar, Button, Divider } from "@heroui/react";
import React, { useEffect, useState } from "react";

interface Requests {
    id: string
    follower: {
      username: string
      name: string
      profile_picture: string
    }
    status?: "PENDING" | "ACCEPTED" | "DECLINED"
}

function MyPendingList() {
  const [requests, setRequests] = useState<Requests[]>([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchList = async () => {
      try {
        const list = await getUserFollowPendingList();
        const withStatus = list.map((r: Requests) => ({
          ...r,
          status: "PENDING"
        }))
        setRequests(withStatus)
      } catch (error) {
        console.error("❌ Pending list could not be fetched:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchList();
  }, []);

  const handleAction = async (followId: string, TYPE: "ACCEPTED" | "DECLINED") => {
    await updateFollow(followId, TYPE)
    setRequests((prev) => prev.map((r) => r.id === followId ? {...r, status: TYPE} : r))
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground">
      <div className="flex flex-col items-center w-full md:w-1/2 min-h-screen border border-b-0 border-gray-700">
      <h1 className="text-2xl font-semibold my-4">
        Follow Requests
      </h1>
      <Divider className="w-full mb-4"/>
      {
        requests.map((request) => (
            <div className="flex items-center justify-between w-full border-b border-gray-800 px-3 py-3" key={request.id}>
                <div className="flex items-center gap-3">
                <Avatar onClick={() => window.location.href="/profile/" + request.follower.username} className="size-16 cursor-pointer" src={request.follower.profile_picture} />
                                <div className="flex flex-col">
                    <a href={`http://localhost:5173/profile/${request.follower.username}`} className="text-xl font-semibold hover:underline cursor-pointer">{request.follower.name}</a>
                    <a href={`http://localhost:5173/profile/${request.follower.username}`} className="text-gray-400 text-sm hover:underline cursor-pointer">@{request.follower.username}</a>
                </div>
                </div>
                {
                  request.status === "PENDING" ? (
                    <div className="flex gap-2">
                      <Button className="bg-success" onClick={async () => handleAction(request.id, "ACCEPTED")}>Accept</Button>
                      <Button className="bg-danger" onClick={async () => handleAction(request.id, "DECLINED")}>Decline</Button>
                    </div>
                  ) : request.status === "ACCEPTED" ? (
                    <span className="text-success font-semibold">Accepted ✅</span>
                  ) : 
                  (
                    <span className="text-danger font-semibold">Declined ❌</span>
                  )
                }
            </div>
        ))
      }
      </div>
    </div>
  );
}

export default MyPendingList;
