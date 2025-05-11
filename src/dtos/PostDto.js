export class Post {
  constructor({
    blogPostId,
    userId,
    title,
    content,
    country,
    dateOfVisit,
    coverImage,
    createdAt,
    updatedAt,
    username
  }) {
    this.blogPostId = blogPostId;
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.country = country;
    this.dateOfVisit = dateOfVisit;
    this.coverImage = coverImage;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.username = username;
  }
}
