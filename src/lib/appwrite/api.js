import { account, databases, storage, avatars, appwrite } from "./config";
import { ID, Query } from "appwrite";

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

export async function signInAccount(user) {
  try {
    const session = await account.createSession(user.email, user.password);

    console.log("User signed in:", session);
    return session;
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error("No user account found");

    const currentUser = await databases.listDocuments(
      appwrite.databaseId,
      appwrite.userCollectionId,
      [Query.equals("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw new Error("No user data found");

    return currentUser.documents[0];
  } catch (error) {
    console.error("Error getting current user:", error);
    throw error;
  }
}
