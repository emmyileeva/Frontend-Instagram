export const navLink = {
  imgURL: String,
  route: String,
  label: String,
};

export const updateUser = {
  userId: String,
  name: String,
  bio: String,
  imageId: String,
  imageUrl: String,
  file: Array,
};

export const newPost = {
  userId: String,
  caption: String,
  file: Array,
  location: String,
  tags: String,
};

export const updatePost = {
  postId: String,
  caption: String,
  imageId: String,
  imageUrl: String,
  file: Array,
  location: String,
  tags: String,
};

export const User = {
  id: String,
  name: String,
  username: String,
  email: String,
  imageUrl: String,
  bio: String,
};

export const newUser = {
  name: String,
  email: String,
  username: String,
  password: String,
};
