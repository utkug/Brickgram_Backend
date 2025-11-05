const BASE_URL = "http://localhost:3000"

interface postData {
    //author_id: string
    post_text: string
    image_url?: string //media url
}

interface postData {
    //author_id: string
    post_text: string
    image_url?: string //media url
}

export const createPost = async (postData: postData) => {
    const res = await fetch(BASE_URL + "/api/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(postData)
    })
    const data = await res.json()
    return data
}

export const getPostDetails = async (postId: string) => {
    const res = await fetch(BASE_URL + "/api/posts/" + postId, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    })
    const data = await res.json()
    return data
}


export const createComment = async (commentData: any) => {
    const res = await fetch(BASE_URL + "/api/comments", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: ""
    })
    const data = await res.json()
    return data
}