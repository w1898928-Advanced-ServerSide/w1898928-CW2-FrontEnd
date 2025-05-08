import api from './api';

const CommentService = {
 
  async getCommentsByPostId(postId) {
    try {
      const response = await api.get(`/comments/post/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch comments');
    }
  },

  async createComment(postId, commentData) {
    try {
      const response = await api.post(`/comments/post/${postId}`, commentData);
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw new Error(error.response?.data?.message || 'Failed to create comment');
    }
  },

  async deleteComment(commentId) {
    try {
      const response = await api.delete(`/comments/${commentId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete comment');
    }
  },

  async updateComment(commentId, updateData) {
    try {
      const response = await api.put(`/comments/${commentId}`, updateData);
      return response.data;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw new Error(error.response?.data?.message || 'Failed to update comment');
    }
  },

  async getCommentCount(postId) {
    try {
      const response = await api.get(`/comments/post/${postId}/count`);
      return response.data.count;
    } catch (error) {
      console.error('Error getting comment count:', error);
      throw new Error(error.response?.data?.message || 'Failed to get comment count');
    }
  }
};

export default CommentService;