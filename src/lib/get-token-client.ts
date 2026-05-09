export function getClientToken() {
  const { getCookie } = require("cookies-next/client");

  return getCookie("token")?.toString() ?? "";
}
