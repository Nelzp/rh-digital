"use client";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

interface IDashboardHero {
  title: string;
  subtitle: string;
  description: string;
}
export function DashboardHero({
  title,
  subtitle,
  description,
}: IDashboardHero) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl bg-slate-950 px-6 py-8 text-slate-100 shadow-xl md:flex-row md:items-center md:justify-between">
      <div className="space-y-3">
        <Badge className="bg-white/10 text-slate-100 hover:bg-white/10">
          {subtitle}
        </Badge>
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-300">
            {description}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start gap-3 md:items-end">
        <Link href="/" className={buttonVariants({ variant: "destructive" })}>
          <HugeiconsIcon icon={ArrowLeft01Icon} className="size-4" />
          Voltar
        </Link>
      </div>
    </div>
  );
}
