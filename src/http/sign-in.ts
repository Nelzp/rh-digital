import { api } from "@/lib/api";
import { SignInSchema } from "@/types/schemas/sign-in-schema";
export async function SignIn(data: SignInSchema) {
  const response = await api<string>("/auth/login", {
    method: "POST",
    body: data,
  });

  return response.data;
}
