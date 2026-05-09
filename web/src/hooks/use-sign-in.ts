import { SignIn } from "@/http/sign-in";
import { useMutation } from "@tanstack/react-query";

export const SIGN_IN_MUTATION_KEY = ["sign-in"];

export function useSignIn() {
  return useMutation({
    mutationKey: SIGN_IN_MUTATION_KEY,
    mutationFn: SignIn,
  });
}
