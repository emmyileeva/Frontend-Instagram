import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwrite = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
};

const client = new Client();

client.setProject(appwrite.projectId);
client.setEndpoint(appwrite.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
