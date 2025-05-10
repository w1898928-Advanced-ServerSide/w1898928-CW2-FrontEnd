export class Post {
    constructor({
      blogPostId,
      userId,
      username,
      title,
      content,
      country,
      dateOfVisit,
      coverImage,
      createdAt,
      updatedAt
    }) {
      this.blogPostId = blogPostId;
      this.userId = userId;
      this.username = username;
      this.title = title;
      this.content = content;
      this.country = country;
      this.dateOfVisit = dateOfVisit;
      this.coverImage = coverImage;
      this.createdAt = createdAt;
      this.updatedAt = updatedAt;
    }
  }
  