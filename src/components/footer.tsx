"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-200">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-md space-y-4">
            <Badge variant="secondary" className="bg-white/10 text-slate-100">
              Portal interno
            </Badge>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-white">
                RH System
              </h2>
              <p className="text-sm leading-6 text-slate-400">
                Centralize rotinas de pessoas com uma experiencia clara,
                confiavel e preparada para o dia a dia do time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 text-sm sm:grid-cols-2 md:gap-12">
            <div className="space-y-3">
              <h3 className="font-medium text-white">Acesso rapido</h3>
              <div className="space-y-2 text-slate-400 flex flex-col">
                <Link
                  href="/dashboard/ferias"
                  className="hover:text-slate-200 transition-colors"
                >
                  Solicitacoes de ferias
                </Link>
                <Link
                  href="/dashboard/folha-pagamento"
                  className="hover:text-slate-200 transition-colors"
                >
                  Folha de pagamento
                </Link>
                <Link
                  href="/dashboard/controle-ponto"
                  className="hover:text-slate-200 transition-colors"
                >
                  Controle de ponto
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-white">Suporte</h3>
              <div className="space-y-2 text-slate-400">
                <p>suporte@rhsystem.com.br</p>
                <p>Politica de privacidade</p>
                <p>Seguranca e conformidade</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium text-white">Status do portal</p>
              <p className="text-sm text-slate-400">
                Ambiente corporativo disponivel para consulta e operacoes dos
                colaboradores.
              </p>
            </div>

            <Badge className="bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/15">
              Online agora
            </Badge>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="flex flex-col gap-3 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} RH System. Todos os direitos reservados.</p>
          <p>Feito para gestao moderna de pessoas.</p>
        </div>
      </div>
    </footer>
  );
}
