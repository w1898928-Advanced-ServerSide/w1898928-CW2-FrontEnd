export const blogPostDTO = (post) => ({
  id: post.blogPostId,
  title: post.title,
  content: post.content,
  country: post.country,
  dateOfVisit: post.dateOfVisit,
  coverImage: post.coverImage,
  createdAt: post.createdAt,
  updatedAt: post.updatedAt,
  author: {
    id: post.userId,
    username: post.username
  },
  reactions: {
    likes: post.likes || 0,
    dislikes: post.dislikes || 0
  }
});

export const blogPostListDTO = (posts) => posts.map(blogPostDTO);