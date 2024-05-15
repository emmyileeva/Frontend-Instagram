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
    const newPost = await databases.createDocument(
      appwrite.databaseId,
      appwrite.postCollectionId,
      ID.unique(),
      post
    );

    console.log("Post created:", newPost);
    return newPost;
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
}

// Update a post
export async function updatePost(post) {
  try {
    const updatedPost = await databases.updateDocument(
      appwrite.databaseId,
      appwrite.postCollectionId,
      post.$id,
      post
    );

    console.log("Post updated:", updatedPost);
    return updatedPost;
  } catch (error) {
    console.error("Error updating post:", error);
    throw error;
  }
}
