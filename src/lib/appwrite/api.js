import { account, databases, storage, avatars, appwrite } from "./config";
import { ID, Query } from "appwrite";

// Create a new user account
export async function createUserAccount(user) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error("Failed to create user account");

    const avatarUrl = avatars.getInitials(user.name);

    const savedUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarUrl,
    });

    console.log("User account created:", newAccount);
    console.log("User data saved to database:", savedUser);

    return newAccount;
  } catch (error) {
    console.error("Error creating user account:", error);
    throw error;
  }
}

// Save user data to the database
export async function saveUserToDB(user) {
  try {
    const newUser = await databases.createDocument(
      appwrite.databaseId,
      appwrite.userCollectionId,
      ID.unique(),
      user
    );

    console.log("User saved to database:", newUser);
    return newUser;
  } catch (error) {
    console.error("Error saving user data to database:", error);
    throw error;
  }
}

// Sign in a user account
export async function signInAccount(user) {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    console.log("User signed in:", session);
    return session;
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
}

// Get the current user
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("No user account found");

    const currentUser = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw new Error("No user data found");

    return currentUser.documents[0];
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
}

// Sign out a user account
export async function signOutAccount() {
  try {
    const session = await account.deleteSession("current");
    console.log("User signed out:", session);
    return {
      success: true,
      data: session,
    };
  } catch (error) {
    console.error("Error signing out user:", error);
    return {
      success: false,
      error: error,
    };
  }
}

// Create a new post
export async function createPost(post) {
  try {
    // Upload file to appwrite storage
    const uploadedFile = await uploadFile(post.file[0]);

    if (!uploadedFile) {
      throw new Error("Failed to upload file");
    }

    // Get file URL
    const fileUrl = getFilePreview(uploadedFile.$id);

    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw new Error("Failed to get file URL");
    }

    // Convert tags into array
    const tags = post.tags ? post.tags.replace(/ /g, "").split(",") : [];

    // Create post
    const newPost = await databases.createDocument(
      appwrite.databaseId,
      appwrite.postCollectionId,
      ID.unique(),
      {
        creator: post.userId,
        caption: post.caption,
        imageUrl: fileUrl,
        imageId: uploadedFile.$id,
        location: post.location,
        tags: tags,
      }
    );

    if (!newPost) {
      await deleteFile(uploadedFile.$id);
      throw new Error("Failed to create post");
    }

    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// Upload a file to Appwrite storage
export async function uploadFile(file) {
  try {
    const response = await storage.createFile(
      appwrite.bucketId,
      ID.unique(),
      file
    );
    return response;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// Get file preview URL
export function getFilePreview(fileId) {
  try {
    if (!fileId) {
      throw new Error("Missing required parameter: 'fileId'");
    }
    return storage.getFilePreview(appwrite.bucketId, fileId);
  } catch (error) {
    console.error("Error getting file preview:", error);
    throw error;
  }
}

// Delete a file from appwrite storage
export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(appwrite.bucketId, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

// Get recent posts
export async function getRecentPosts() {
  try {
    const posts = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.postCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(20)]
    );

    if (!posts) throw new Error("Failed to fetch recent posts");

    return posts;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// like/unlike a post
export async function likePost(postId, likesArray) {
  try {
    const updatedPost = await databases.updateDocument(
      appwrite.databaseId,
      appwrite.postCollectionId,
      postId,
      {
        likes: likesArray,
      }
    );

    if (!updatedPost) throw new Error("Error updating post");

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// save a post
export async function savePost(userId, postId) {
  try {
    const updatedPost = await databases.createDocument(
      appwrite.databaseId,
      appwrite.savesCollectionId,
      ID.unique(),
      {
        user: userId,
        post: postId,
      }
    );

    if (!updatedPost) throw new Error("Error saving post");

    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

// delete saved post
export async function deleteSavedPost(savedRecordId) {
  try {
    const statusCode = await databases.deleteDocument(
      appwrite.databaseId,
      appwrite.savesCollectionId,
      savedRecordId
    );

    if (!statusCode) throw new Error("Error deleting saved post");

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

// get post by id
export async function getPostById(postId) {
  if (!postId) throw Error("postId is required");

  try {
    const post = await databases.getDocument(
      appwrite.databaseId,
      appwrite.postCollectionId,
      postId
    );

    if (!post) throw Error("Post not found");

    return post;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// update post
export async function updatePost(post) {
  const hasFileToUpdate = post.file.length > 0;
  try {
    let image = {
      imageUrl: post.imageUrl,
      imageId: post.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(post.file[0]);
      if (!uploadedFile) {
        throw new Error("Failed to upload new file");
      }

      // Get new file URL
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw new Error("Failed to get new file URL");
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Convert tags into array
    const tags = post.tags?.replace(/ /g, "").split(",") || [];

    // Update post
    const updatedPost = await databases.updateDocument(
      appwrite.databaseId,
      appwrite.postCollectionId,
      post.postId,
      {
        caption: post.caption,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        location: post.location,
        tags: tags,
      }
    );

    // Failed to update
    if (!updatedPost) {
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      throw new Error("Failed to update post");
    }
    if (hasFileToUpdate) {
      await deleteFile(post.imageId);
    }

    return updatedPost;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}

// delete post
export async function deletePost(postId, imageId) {
  if (!postId || !imageId) return;

  try {
    const post = await databases.getDocument(
      appwrite.databaseId,
      appwrite.postCollectionId,
      postId
    );
    if (!post) {
      console.error(`Post with ID ${postId} not found.`);
      return;
    }

    const statusCode = await databases.deleteDocument(
      appwrite.databaseId,
      appwrite.postCollectionId,
      postId
    );

    if (!statusCode) throw Error;

    await deleteFile(imageId);

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}

// get infinite posts
export async function getInfinitePosts({ pageParam }) {
  const queries = [Query.orderDesc("$updatedAt"), Query.limit(9)];

  if (pageParam) {
    queries.push(Query.cursorAfter(pageParam.toString()));
  }

  try {
    const posts = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.postCollectionId,
      queries
    );

    return posts;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // If the document used as the cursor is not found, try fetching the documents without the cursor
    if (error.message.includes("cursor")) {
      const posts = await databases.listDocuments(
        appwrite.databaseId,
        appwrite.postCollectionId,
        [Query.orderDesc("$updatedAt"), Query.limit(9)]
      );
      return posts;
    }
  }
}

// search posts
export async function searchPosts(searchTerm) {
  try {
    const posts = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.postCollectionId,
      [Query.search("caption", searchTerm)]
    );

    if (!posts) throw Error;

    return posts;
  } catch (error) {
    console.log(error);
  }
}

// get users
export async function getUsers(limit) {
  const queries = [Query.orderDesc("$createdAt")];

  if (limit) {
    queries.push(Query.limit(limit));
  }

  try {
    const users = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.userCollectionId,
      queries
    );

    if (!users) throw Error;

    return users;
  } catch (error) {
    console.log(error);
  }
}

// get user posts
export async function getUserPosts(userId) {
  if (!userId) return;

  try {
    const post = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.postCollectionId,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")]
    );

    if (!post) throw new Error("Failed to fetch user posts");

    return post;
  } catch (error) {
    console.error(error);
  }
}

// get user by id
export async function getUserById(userId) {
  try {
    const user = await databases.getDocument(
      appwrite.databaseId,
      appwrite.userCollectionId,
      userId
    );

    if (!user) throw Error;

    return user;
  } catch (error) {
    console.log(error);
  }
}

// update user
export async function updateUser(user) {
  const hasFileToUpdate = user.file?.length > 0;
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (hasFileToUpdate) {
      // Upload new file to appwrite storage
      const uploadedFile = await uploadFile(user.file[0]);
      if (!uploadedFile) throw new Error("Failed to upload file");

      // Get new file url
      const fileUrl = getFilePreview(uploadedFile.$id);
      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw new Error("Failed to get file URL");
      }

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    // Update user
    const updatedUser = await databases.updateDocument(
      appwrite.databaseId,
      appwrite.userCollectionId,
      user.userId,
      {
        name: user.name,
        username: user.username,
        bio: user.bio,
        imageUrl: image.imageUrl,
        imageId: image.imageId,
      }
    );

    // If a new file is provided, update the user's avatar
    if (hasFileToUpdate && user.file && Array.isArray(user.file)) {
      await appwrite.account.updateAvatar(user.file[0]);
    }

    // Failed to update
    if (!updatedUser) {
      // Delete new file that has been recently uploaded
      if (hasFileToUpdate) {
        await deleteFile(image.imageId);
      }
      // If no new file uploaded, just throw error
      throw new Error("Failed to update user");
    }

    // Safely delete old file after successful update
    if (user.imageId && hasFileToUpdate) {
      await deleteFile(user.imageId);
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}
