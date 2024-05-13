import { useMutation } from "@tanstack/react-query";
import { createUserAccount } from "@/lib/appwrite/api";

export const useCreateUserAccountMutation = () => {
  return useMutation({
    mutationFn: (user) => createUserAccount(user),
  });
};
