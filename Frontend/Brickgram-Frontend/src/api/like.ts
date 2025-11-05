// src/api/like.ts
const BASE_URL = "http://localhost:3000/api/likes";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Like a post
export const likePost = async (postId: string) => {
  const res = await fetch(`${BASE_URL}/post/${postId}`, {
    method: "POST",
    headers: getAuthHeaders()
  });
  
  return res.json();
};

// Like a comment
export const likeComment = async (commentId: string) => {
  const res = await fetch(`${BASE_URL}/comment/${commentId}`, {
    method: "POST",
    headers: getAuthHeaders()
  });
  return res.json();
};

// Delete a like (unlike)
export const deletePostLike = async (postId: string) => {
  const res = await fetch(`${BASE_URL}/post/${postId}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  return res.json();
};

export const deleteCommentLike = async (commentId: string) => {
  const res = await fetch(`${BASE_URL}/comment/${commentId}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });

  return res.json();
};