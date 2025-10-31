const BASE_URL = "http://localhost:3000"

export const getUser = async (username: string) => {
    const token = localStorage.getItem("token")
    const res = await fetch("http://localhost:3000/api/users/username/" + username, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    const data = await res.json()
    return data  
}

export const followUser = async (followingUserId: string) => {
    const res = await fetch("http://localhost:3000/api/follow/" + followingUserId , {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
    const data = await res.json()
    return data
}


export const unfollowUser = async (followingUserId: string) => {
    const res = await fetch("http://localhost:3000/api/follow/" + followingUserId , {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
    })
    const data = await res.json()
    return data
}

export const blockUser = async () => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: ""
    })
}

export const unblockUser = async () => {
    const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: ""
    })
}

export const getUserFollowers = async (userId: string) => {
    const res = await fetch(BASE_URL + "/api/follow/" + userId + "/followers")
    const data = await res.json()
    return data
}

export const getUserFollowings = async (userId: string) => {
    const res = await fetch(BASE_URL + "/api/follow/" + userId + "/followings")
    const data = await res.json()
    return data
}

export const getUserFollowPendingList = async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(BASE_URL + "/api/follow/pending", {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    const data = await res.json()
    return data
}

//Accept / Decline
export const updateFollow = async (followId: string, status: string) => {
    const token = localStorage.getItem("token")
    const res = await fetch(BASE_URL + "/api/follow/" + followId + "/status", {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({status})
    })
    const data = await res.json()
    return data
}