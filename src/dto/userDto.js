export const userDTO = (user) => ({
  id: user.id,
  username: user.username,
  email: user.email,
  avatar: user.avatar,
  bio: user.bio,
  createdAt: user.createdAt,
  stats: {
    postCount: user.postCount || 0,
    followerCount: user.followerCount || 0,
    followingCount: user.followingCount || 0
  }
});

export const userListDTO = (users) => users.map(userDTO);