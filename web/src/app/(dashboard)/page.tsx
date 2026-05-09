"use client";

import Image from "next/image";
import Link from "next/link";

export default function Dashboard() {
  return (
    <main className="w-full flex-1">
      <div className="p-20 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* FERIAS */}
          <Link
            href="/ferias"
            className="relative block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl h-[300px]"
          >
            <Image
              src="/images/ferias.png"
              alt="Férias"
              width={1024}
              height={1536}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Férias</h3>
              <p>Solicitar e visualizar férias</p>
            </div>
          </Link>

          {/* PAGAMENTO */}
          <Link
            href="/pagamento"
            className="relative block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
          >
            <Image
              src="/images/pagamento.png"
              alt="Pagamento"
              width={1024}
              height={1536}
              className="absolute inset-0 w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
              <h3 className="text-2xl font-bold mb-2">Pagamento</h3>
              <p>Ver folha salarial</p>
            </div>
          </Link>

          {/* PONTO */}
          <Link
            href="/ponto"
            className="relative block overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
          >
            <Image
              src="/images/ponto.png"
              alt="Ponto"
              width={1024}
              height={1536}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
              <h3 className="mb-2 text-2xl font-bold">Ponto</h3>
              <p>Registrar horario</p>
            </div>
          </Link>
        </div>

        {/* INDICADORES */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4 p-2 text-slate-700">
            Indicadores 📈
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-xl shadow transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
              <p className="text-gray-500 text-sm">🌴 Férias disponíveis</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-4">
                15 dias
              </h3>
            </div>

            <div className="bg-white p-5 rounded-xl shadow transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
              <p className="text-gray-500 text-sm">⏰Horas trabalhadas</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-4">160h</h3>
            </div>

            <div className="bg-white p-5 rounded-xl shadow transition-all duration-500 transform hover:-translate-y-2 cursor-pointer">
              <p className="text-gray-500 text-sm">💳 Último pagamento</p>
              <h3 className="text-2xl font-bold text-slate-800 mt-4">
                R$ 3.200
              </h3>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
