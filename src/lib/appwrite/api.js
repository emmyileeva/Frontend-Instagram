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

    if (!uploadedFile) throw Error;

    // Get file url
    const fileUrl = getFilePreview(uploadedFile.$id);
    if (!fileUrl) {
      await deleteFile(uploadedFile.$id);
      throw Error;
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
      throw Error;
    }

    return newPost;
  } catch (error) {
    console.log(error);
  }
}

// upload file to appwrite storage
export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwrite.storageId,
      ID.unique(),
      file
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}

// Get file preview
export function getFilePreview(fileId) {
  try {
    const fileUrl = storage.getFilePreview(
      appwrite.storageId,
      fileId,
      2000,
      2000,
      "top",
      100
    );

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    console.log(error);
  }
}

// Delete a file from appwrite storage
export async function deleteFile(fileId) {
  try {
    await storage.deleteFile(appwrite.storageId, fileId);

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
