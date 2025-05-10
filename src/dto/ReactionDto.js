export const ReactionType = {
    LIKE: "like",
    DISLIKE: "dislike"
  };
  
  export class Reaction {
    constructor({ reactionId, userId, postId, type, createdAt }) {
      this.reactionId = reactionId;
      this.userId = userId;
      this.postId = postId;
      this.type = type;
      this.createdAt = createdAt;
    }
  }
  