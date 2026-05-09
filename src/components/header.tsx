"use client";

import { Logout02Icon, UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { deleteCookie } from "cookies-next/client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function Header() {
  const router = useRouter();

  async function handleSignOut() {
    await deleteCookie("token");

    toast.success("Logout realizado com sucesso!");

    router.push("/auth/sign-in");
  }

  return (
    <header className="bg-slate-950 text-slate-100 shadow flex justify-between items-center h-35">
      <div className="max-w-5xl mx-auto flex justify-between items-center w-full p-8">
        <Image
          src="/images/logo.png"
          alt=""
          width={1536}
          height={1024}
          className="size-35 w-60 h-45 cursor-pointer text-white mt-2.5"
        />
        <div className="flex items-center gap-4">
          {/* Icone */}
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>
              <HugeiconsIcon icon={UserIcon} />
            </AvatarFallback>
          </Avatar>
          <span className="text-white">Bem-vindo, João</span>
          <Button variant="ghost" size="icon" onClick={handleSignOut}>
            <HugeiconsIcon className="size-5" icon={Logout02Icon} />
          </Button>
        </div>
      </div>
    </header>
  );
}
