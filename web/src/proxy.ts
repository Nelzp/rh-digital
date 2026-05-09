import { type NextRequest, NextResponse } from "next/server";
import { findUserByEmail } from "@/http/find-user-by-email";

const PUBLIC_ROUTES = ["/auth/sign-in", "/auth/sign-up"];
const PUBLIC_AND_PRIVATE_ROUTES = [""];

type TokenPayload = {
  exp?: number;
  sub?: string;
};

function decodeTokenPayload(token: string) {
  const payload = token.split(".")[1];

  if (!payload) {
    return null;
  }

  try {
    return JSON.parse(
      atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
    ) as TokenPayload;
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  // 1. Pega a sessão
  const token = request.cookies.get("token")?.value;
  const payload = token ? decodeTokenPayload(token) : null;
  const isExpired = payload?.exp ? payload.exp * 1000 < Date.now() : false;
  const user =
    token && payload?.sub && !isExpired
      ? await findUserByEmail(payload.sub, token)
      : null;
  const session = {
    data: user,
  };

  const isAuthenticated = !!session.data;

  const pathname = request.nextUrl.pathname;

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const isPublicOrPrivateRoute = PUBLIC_AND_PRIVATE_ROUTES.includes(pathname);

  // 2. Se NÃO estiver logado e tentar acessar rota privada
  if (!isAuthenticated && !isPublicRoute && !isPublicOrPrivateRoute) {
    const callbackUrl = `${pathname}${request.nextUrl.search}`;

    const url = request.nextUrl.clone();
    url.pathname = "/auth/sign-in";
    url.searchParams.set("callbackUrl", callbackUrl);

    return NextResponse.redirect(url);
  }

  // 3. Se estiver logado e tentar acessar login/register
  if (isAuthenticated && isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/";

    return NextResponse.redirect(url);
  }

  // 4. Continua normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|icon|apple-icon|.*\\..*).*)"],
};
