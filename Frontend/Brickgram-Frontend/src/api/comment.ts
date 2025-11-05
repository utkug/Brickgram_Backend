// src/api/comment.ts
const API_BASE_URL = "http://localhost:3000/api/posts/comments";

interface CreateCommentData {
  post_id: string;
  comment_text: string;
  parent_id?: string; // For replies
}

interface UpdateCommentData {
  comment_text: string;
}

// Helper function to handle fetch responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// Get auth token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Create a comment or reply
export const createComment = async (data: CreateCommentData) => {
  const response = await fetch(
    `${API_BASE_URL}/posts/${data.post_id}/comments`,
    {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        comment_text: data.comment_text,
        parent_id: data.parent_id
      })
    }
  );
  return handleResponse(response);
};

// Get all comments for a post
export const getCommentsByPost = async (postId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/posts/${postId}/comments`,
    {
      method: 'GET',
      headers: getAuthHeaders()
    }
  );
  return handleResponse(response);
};

// Get replies for a specific comment
export const getRepliesByComment = async (commentId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/comments/${commentId}/replies`,
    {
      method: 'GET',
      headers: getAuthHeaders()
    }
  );
  return handleResponse(response);
};

// Get a single comment by ID
export const getCommentById = async (commentId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/comments/${commentId}`,
    {
      method: 'GET',
      headers: getAuthHeaders()
    }
  );
  return handleResponse(response);
};

// Update a comment
export const updateComment = async (commentId: string, data: UpdateCommentData) => {
  const response = await fetch(
    `${API_BASE_URL}/comments/${commentId}`,
    {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    }
  );
  return handleResponse(response);
};

// Delete a comment
export const deleteComment = async (commentId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/comments/${commentId}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders()
    }
  );
  return handleResponse(response);
};

// Get comment count for a post
export const getCommentCount = async (postId: string) => {
  const response = await fetch(
    `${API_BASE_URL}/posts/${postId}/comments/count`,
    {
      method: 'GET',
      headers: getAuthHeaders()
    }
  );
  return handleResponse(response);
};