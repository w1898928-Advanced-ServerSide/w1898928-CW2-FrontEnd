export class User {
  constructor({ id, username, email, createdAt, updatedAt }) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
