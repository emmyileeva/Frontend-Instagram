import { useMutation } from "@tanstack/react-query";
import { createUserAccount, signInAccount } from "@/lib/appwrite/api";

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  return useMutation({
    mutationFn: (user) => signInAccount(user),
  });
};
