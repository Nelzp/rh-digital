"use client";

import { UserIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function Header() {
  const Session = authClient.useSession();

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
          <span className="text-white">
            Bem-vindo, {Session.data?.user.name}
          </span>
        </div>
      </div>
    </header>
  );
}
