import type { ReactNode } from "react";

interface IAuthLayout {
  children: ReactNode;
}
export default function AuthLayout({ children }: IAuthLayout) {
  return (
    <main className="min-h-svh flex justify-center items-center p-4">
      {children}
    </main>
  );
}
