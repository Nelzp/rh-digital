import { api } from "@/lib/api";
import { User } from "@/types/user";

export async function findUserByEmail(email: string) {
  const response = await api<User>("/usuarios/:email/email", {
    method: "GET",
    params: { email: email },
  });

  return response.data;
}
