"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import {
  Calendar03Icon,
  CalendarAdd01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { authClient } from "@/lib/auth-client";
import {
  type TimeClockSchema,
  timeClockSchema,
} from "@/types/schemas/time-clock-schema";
import { DashboardHero } from "../_components/dashboard-hero";

type TimeClockRecord = TimeClockSchema & {
  id: string;
  createdAt: string;
};

const INITIAL_VALUES: TimeClockSchema = {
  reason: "Entrada",
};

function buildStorageKey(userId?: string) {
  return `rh-system:time-clock:${userId ?? "guest"}`;
}

function formatDateTime(dateString: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
    timeStyle: "medium",
  }).format(new Date(dateString));
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
  }).format(new Date(dateString));
}

function formatTime(dateString: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeStyle: "medium",
  }).format(new Date(dateString));
}

export default function TimeClockPage() {
  const session = authClient.useSession();
  const userName = session.data?.user.name ?? "Colaborador";
  const storageKey = buildStorageKey(session.data?.user.id);
  const [records, setRecords] = useState<TimeClockRecord[]>([]);

  const form = useForm<TimeClockSchema>({
    resolver: standardSchemaResolver(timeClockSchema),
    defaultValues: INITIAL_VALUES,
  });

  useEffect(() => {
    const storedValue = window.localStorage.getItem(storageKey);

    if (!storedValue) {
      setRecords([]);
      return;
    }

    try {
      const parsed = JSON.parse(storedValue) as TimeClockRecord[];
      setRecords(parsed);
    } catch {
      setRecords([]);
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  function handleSubmit(data: TimeClockSchema) {
    const nextRecord: TimeClockRecord = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const nextRecords = [nextRecord, ...records];
    setRecords(nextRecords);
    window.localStorage.setItem(storageKey, JSON.stringify(nextRecords));
    toast.success(
      `Ponto de ${data.reason.toLowerCase()} registrado com sucesso.`,
    );
  }

  const latestRecord = records[0];

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-6 md:px-8">
      <DashboardHero
        title="Bater Ponto"
        subtitle="Controle de ponto"
        description="Selecione o motivo do registro e confirme o ponto para salvar a
                data e o horario no seu historico."
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <Card className="py-0">
          <CardHeader className="border-b py-5">
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={CalendarAdd01Icon} className="size-5" />
              Registrar ponto
            </CardTitle>
            <CardDescription>
              Escolha se o registro e de entrada, saida ou almoco.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-5">
            <form
              id="time-clock-form"
              className="space-y-5"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <FieldGroup>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border bg-background p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Colaborador
                    </p>
                    <p className="mt-2 text-sm font-medium text-foreground">
                      {userName}
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-background p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Registros salvos
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-foreground">
                      {records.length}
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-background p-4">
                    <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      Ultimo motivo
                    </p>
                    <Badge className="mt-2 bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/15 dark:text-emerald-200">
                      {latestRecord?.reason ?? "Aguardando registro"}
                    </Badge>
                  </div>
                </div>

                <Controller
                  name="reason"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="time-clock-reason">
                        Motivo do ponto
                      </FieldLabel>
                      <NativeSelect
                        id="time-clock-reason"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        aria-invalid={fieldState.invalid}
                        className="w-full"
                      >
                        <NativeSelectOption value="Entrada">
                          Entrada
                        </NativeSelectOption>
                        <NativeSelectOption value="Saida">
                          Saida
                        </NativeSelectOption>
                        <NativeSelectOption value="Almoco">
                          Almoco
                        </NativeSelectOption>
                      </NativeSelect>
                      <FieldDescription>
                        O sistema registra a data e o horario no momento do
                        clique.
                      </FieldDescription>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter className="justify-end gap-3">
            <Button type="submit" form="time-clock-form">
              <HugeiconsIcon icon={Tick02Icon} className="size-4" />
              Bater ponto
            </Button>
          </CardFooter>
        </Card>

        <Card className="py-0">
          <CardHeader className="border-b py-5">
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={Calendar03Icon} className="size-5" />
              Ultimo registro
            </CardTitle>
            <CardDescription>
              O formulario abaixo e preenchido assim que um novo ponto e batido.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-5">
            {latestRecord ? (
              <div className="rounded-2xl border bg-background p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Ultimo ponto registrado
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-foreground">
                      {latestRecord.reason}
                    </h2>
                  </div>

                  <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
                    Registrado agora
                  </Badge>
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="latest-date">Data</FieldLabel>
                    <Input
                      id="latest-date"
                      readOnly
                      value={formatDate(latestRecord.createdAt)}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="latest-time">Horario</FieldLabel>
                    <Input
                      id="latest-time"
                      readOnly
                      value={formatTime(latestRecord.createdAt)}
                    />
                  </Field>

                  <Field className="md:col-span-2">
                    <FieldLabel htmlFor="latest-reason">Motivo</FieldLabel>
                    <Input
                      id="latest-reason"
                      readOnly
                      value={latestRecord.reason}
                    />
                  </Field>
                </div>
              </div>
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/30 p-8 text-center">
                <Badge variant="outline">Sem registro</Badge>
                <h2 className="mt-4 text-lg font-semibold text-foreground">
                  Bata o seu primeiro ponto
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Assim que voce confirmar um motivo, o sistema vai preencher os
                  campos de data, horario e motivo nesta area.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="py-0 mb-8">
        <CardHeader className="border-b py-5">
          <CardTitle>Historico de pontos</CardTitle>
          <CardDescription>
            Registros salvos neste navegador para {userName}.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-5">
          {records.length ? (
            <div className="grid gap-4">
              {records.map((record) => (
                <article
                  key={record.id}
                  className="rounded-2xl border bg-background p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-semibold text-foreground">
                          {record.reason}
                        </h2>
                        <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/15 dark:text-emerald-200">
                          Confirmado
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span className="rounded-full border bg-muted/40 px-3 py-1 text-foreground">
                          Data {formatDate(record.createdAt)}
                        </span>
                        <span className="rounded-full border bg-muted/40 px-3 py-1 text-foreground">
                          Horario {formatTime(record.createdAt)}
                        </span>
                      </div>
                    </div>

                    <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                      Registro realizado em {formatDateTime(record.createdAt)}.
                    </p>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
              Nenhum ponto registrado neste navegador ate o momento.
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
