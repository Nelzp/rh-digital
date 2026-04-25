import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authClient } from "./lib/auth-client";

const PUBLIC_ROUTES = ["/auth/sign-in", "/auth/sign-up"];
const PUBLIC_AND_PRIVATE_ROUTES = ["/"];

export async function proxy(request: NextRequest) {
  // 1. Pega a sessão
  const session = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

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
    url.pathname = "/dashboard";

    return NextResponse.redirect(url);
  }

  // 4. Continua normalmente
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|icon|apple-icon|.*\\..*).*)"],
};
