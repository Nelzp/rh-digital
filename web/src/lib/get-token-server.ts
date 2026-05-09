export async function getServerToken() {
  const { cookies } = require("next/headers");

  const cookieStore = await cookies();

  return cookieStore.get("token")?.value ?? "";
}
