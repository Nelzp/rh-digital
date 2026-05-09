"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { Calendar03Icon, CalendarAdd01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import type { DateRange } from "react-day-picker";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import {
  type VacationRequestSchema,
  vacationRequestSchema,
} from "@/types/schemas/vacation-request-schema";
import { DashboardHero } from "../_components/dashboard-hero";

type VacationRequestRecord = VacationRequestSchema & {
  id: string;
  createdAt: string;
};

const INITIAL_VALUES: VacationRequestSchema = {
  startDate: "",
  endDate: "",
  quantityOfDays: 0,
  requestType: "Ferias integrais",
  observations: "",
  status: "Pendente para aprovacao",
};

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(dateString));
}

function formatDateRangeLabel(range: DateRange | undefined) {
  if (!range?.from || !range.to) {
    return "Selecione o inicio e o fim do periodo no calendario.";
  }

  return `${formatDate(toDateOnlyString(range.from))} ate ${formatDate(
    toDateOnlyString(range.to),
  )}`;
}

function toDateOnlyString(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function calculateRequestedDays(from: Date, to: Date) {
  const fromUtc = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const toUtc = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());

  return Math.floor((toUtc - fromUtc) / 86400000) + 1;
}

function buildStorageKey(userId?: string) {
  return `rh-system:vacation-requests:${userId ?? "guest"}`;
}

export default function VacationRequestPage() {
  const session = authClient.useSession();
  const userName = session.data?.user.name ?? "Colaborador";
  const storageKey = buildStorageKey(session.data?.user.id);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [selectedRange, setSelectedRange] = useState<DateRange>();
  const [requests, setRequests] = useState<VacationRequestRecord[]>([]);

  const form = useForm<VacationRequestSchema>({
    resolver: standardSchemaResolver(vacationRequestSchema),
    defaultValues: INITIAL_VALUES,
  });

  useEffect(() => {
    const storedValue = window.localStorage.getItem(storageKey);

    if (!storedValue) {
      setRequests([]);
      return;
    }

    try {
      const parsed = JSON.parse(storedValue) as VacationRequestRecord[];
      setRequests(parsed);
    } catch {
      setRequests([]);
      window.localStorage.removeItem(storageKey);
    }
  }, [storageKey]);

  function handleCalendarSelect(range: DateRange | undefined) {
    setSelectedRange(range);

    if (!range?.from || !range.to) {
      form.setValue("startDate", "", { shouldValidate: true });
      form.setValue("endDate", "", { shouldValidate: true });
      form.setValue("quantityOfDays", 0, { shouldValidate: true });
      return;
    }

    form.setValue("startDate", toDateOnlyString(range.from), {
      shouldValidate: true,
      shouldDirty: true,
    });
    form.setValue("endDate", toDateOnlyString(range.to), {
      shouldValidate: true,
      shouldDirty: true,
    });
    form.setValue(
      "quantityOfDays",
      calculateRequestedDays(range.from, range.to),
      {
        shouldValidate: true,
        shouldDirty: true,
      },
    );
  }

  function handleReset() {
    setSelectedRange(undefined);
    form.reset(INITIAL_VALUES);
  }

  function handleSubmit(data: VacationRequestSchema) {
    const nextRequest: VacationRequestRecord = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };

    const nextRequests = [nextRequest, ...requests];
    setRequests(nextRequests);
    window.localStorage.setItem(storageKey, JSON.stringify(nextRequests));
    handleReset();
    toast.success(
      "Solicitacao de ferias enviada com status pendente para aprovacao.",
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-6 md:px-8">
      <DashboardHero
        title="Solicitacao de Ferias"
        subtitle="Portal de ferias"
        description="Selecione o periodo no calendario, revise os dados da
                solicitacao e envie para analise."
      />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <Card className="py-0">
          <CardHeader className="border-b py-5">
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={Calendar03Icon} className="size-5" />
              Calendario de selecao
            </CardTitle>
            <CardDescription>
              Escolha a data inicial e final do seu periodo de ferias.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5 py-5">
            <div className="rounded-2xl border bg-background p-3">
              <Calendar
                mode="range"
                numberOfMonths={2}
                selected={selectedRange}
                onSelect={handleCalendarSelect}
                locale={ptBR}
                disabled={{ before: today }}
                className="w-full"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border bg-background p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Periodo
                </p>
                <p className="mt-2 text-sm font-medium text-foreground">
                  {formatDateRangeLabel(selectedRange)}
                </p>
              </div>

              <div className="rounded-2xl border bg-background p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Dias solicitados
                </p>
                <p className="mt-2 text-2xl font-semibold text-foreground">
                  {form.watch("quantityOfDays") || 0}
                </p>
              </div>

              <div className="rounded-2xl border bg-background p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                  Status inicial
                </p>
                <Badge className="mt-4 bg-amber-500/15 text-amber-700 hover:bg-amber-500/15 dark:text-amber-200">
                  Pendente
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="py-0 ">
          <CardHeader className="border-b py-5">
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={CalendarAdd01Icon} className="size-5" />
              Formulario da solicitacao
            </CardTitle>
            <CardDescription>
              O formulario e liberado assim que o periodo for selecionado.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-5">
            {selectedRange?.from && selectedRange.to ? (
              <form
                id="vacation-request-form"
                className="space-y-5"
                onSubmit={form.handleSubmit(handleSubmit)}
              >
                <FieldGroup>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Controller
                      name="startDate"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="vacation-start-date">
                            Inicio das ferias
                          </FieldLabel>
                          <Input
                            {...field}
                            id="vacation-start-date"
                            readOnly
                            value={field.value ? formatDate(field.value) : ""}
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="endDate"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="vacation-end-date">
                            Fim das ferias
                          </FieldLabel>
                          <Input
                            {...field}
                            id="vacation-end-date"
                            readOnly
                            value={field.value ? formatDate(field.value) : ""}
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </div>

                  <Controller
                    name="quantityOfDays"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="vacation-quantity">
                          Quantidade de dias
                        </FieldLabel>
                        <Input
                          id="vacation-quantity"
                          readOnly
                          value={field.value ? `${field.value} dias` : "0 dias"}
                          aria-invalid={fieldState.invalid}
                        />
                        <FieldDescription>
                          Quantidade calculada automaticamente a partir do
                          periodo selecionado.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="requestType"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="vacation-request-type">
                          Tipo da solicitacao
                        </FieldLabel>
                        <NativeSelect
                          id="vacation-request-type"
                          value={field.value}
                          onChange={field.onChange}
                          onBlur={field.onBlur}
                          name={field.name}
                          aria-invalid={fieldState.invalid}
                        >
                          <NativeSelectOption value="Ferias integrais">
                            Ferias integrais
                          </NativeSelectOption>
                          <NativeSelectOption value="Fracionamento">
                            Fracionamento
                          </NativeSelectOption>
                          <NativeSelectOption value="Abono pecuniario">
                            Abono pecuniario
                          </NativeSelectOption>
                        </NativeSelect>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="observations"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="vacation-observations">
                          Observacoes
                        </FieldLabel>
                        <Textarea
                          {...field}
                          id="vacation-observations"
                          placeholder="Adicione detalhes que ajudem na analise da solicitacao."
                          value={field.value ?? ""}
                          aria-invalid={fieldState.invalid}
                          maxLength={500}
                        />
                        <FieldDescription>
                          Campo opcional com limite de 500 caracteres.
                        </FieldDescription>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="status"
                    control={form.control}
                    render={({ field }) => (
                      <Field>
                        <FieldLabel htmlFor="vacation-status">
                          Status
                        </FieldLabel>
                        <Input
                          {...field}
                          id="vacation-status"
                          readOnly
                          value={field.value}
                        />
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>
            ) : (
              <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/30 p-8 text-center">
                <Badge variant="outline">Aguardando periodo</Badge>
                <h2 className="mt-4 text-lg font-semibold text-foreground">
                  Selecione um intervalo no calendario
                </h2>
                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Depois de definir a data inicial e final, o formulario sera
                  exibido com o status inicial de pendente para aprovacao.
                </p>
              </div>
            )}
          </CardContent>

          {selectedRange?.from && selectedRange.to && (
            <CardFooter className="justify-end gap-3">
              <Button type="button" variant="outline" onClick={handleReset}>
                Limpar
              </Button>
              <Button type="submit" form="vacation-request-form">
                Enviar solicitacao
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>

      <Card className="py-0 mb-8 max-w-6xl mx-auto w-full">
        <CardHeader className="border-b py-5">
          <CardTitle>Minhas solicitacoes</CardTitle>
          <CardDescription>
            Historico salvo neste navegador para {userName}.
          </CardDescription>
        </CardHeader>
        <CardContent className="py-5">
          {requests.length ? (
            <div className="grid gap-4">
              {requests.map((request) => (
                <article
                  key={request.id}
                  className="rounded-2xl border bg-background p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-base font-semibold text-foreground">
                          {formatDate(request.startDate)} ate{" "}
                          {formatDate(request.endDate)}
                        </h2>
                        <Badge className="bg-amber-500/15 text-amber-700 hover:bg-amber-500/15 dark:text-amber-200">
                          {request.status}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                        <span
                          className={cn(
                            "rounded-full border px-3 py-1",
                            "bg-muted/40 text-foreground",
                          )}
                        >
                          {request.quantityOfDays} dias
                        </span>
                        <span className="rounded-full border bg-muted/40 px-3 py-1 text-foreground">
                          {request.requestType}
                        </span>
                        <span className="rounded-full border bg-muted/40 px-3 py-1 text-foreground">
                          Enviada em {formatDate(request.createdAt)}
                        </span>
                      </div>
                    </div>

                    <div className="max-w-xl text-sm leading-6 text-muted-foreground">
                      {request.observations?.trim()
                        ? request.observations
                        : "Sem observacoes adicionais para esta solicitacao."}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
              Nenhuma solicitacao registrada neste navegador ate o momento.
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
