"use client";

import {
  ArrowDown01Icon,
  Calendar03Icon,
  Dollar01Icon,
  FileDownloadIcon,
  Invoice03Icon,
  Wallet02Icon,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { authClient } from "@/lib/auth-client";
import { DashboardHero } from "../_components/dashboard-hero";

type PaymentStatus = "Pago" | "Pendente";

type PaymentItem = {
  label: string;
  amount: number;
};

type PaymentRecord = {
  id: string;
  competency: string;
  payDate: string;
  status: PaymentStatus;
  earnings: PaymentItem[];
  deductions: PaymentItem[];
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
};

type PaymentFilterForm = {
  competency: string;
};

const DEFAULT_FORM_VALUES: PaymentFilterForm = {
  competency: "",
};

function buildStorageKey(userId?: string) {
  return `rh-system:payments:${userId ?? "guest"}`;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
  }).format(new Date(dateString));
}

function formatCompetency(competency: string) {
  const [year, month] = competency.split("-");

  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric",
  }).format(new Date(Number(year), Number(month) - 1, 1));
}

function getStatusBadgeClassName(status: PaymentStatus) {
  if (status === "Pago") {
    return "bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/15 dark:text-emerald-200";
  }

  return "bg-amber-500/15 text-amber-700 hover:bg-amber-500/15 dark:text-amber-200";
}

function createPaymentRecord(input: {
  competency: string;
  payDate: string;
  status: PaymentStatus;
  earnings: PaymentItem[];
  deductions: PaymentItem[];
}) {
  const grossSalary = input.earnings.reduce(
    (total, item) => total + item.amount,
    0,
  );
  const totalDeductions = input.deductions.reduce(
    (total, item) => total + item.amount,
    0,
  );

  return {
    id: input.competency,
    competency: input.competency,
    payDate: input.payDate,
    status: input.status,
    earnings: input.earnings,
    deductions: input.deductions,
    grossSalary,
    totalDeductions,
    netSalary: grossSalary - totalDeductions,
  } satisfies PaymentRecord;
}

function getMockPayments() {
  return [
    createPaymentRecord({
      competency: "2026-04",
      payDate: "2026-04-30T12:00:00.000Z",
      status: "Pago",
      earnings: [
        { label: "Salario base", amount: 4200 },
        { label: "Horas extras", amount: 480 },
        { label: "Bonus de performance", amount: 750 },
      ],
      deductions: [
        { label: "INSS", amount: 462.88 },
        { label: "Vale transporte", amount: 252 },
        { label: "Plano de saude", amount: 189.9 },
      ],
    }),
    createPaymentRecord({
      competency: "2026-03",
      payDate: "2026-03-31T12:00:00.000Z",
      status: "Pago",
      earnings: [
        { label: "Salario base", amount: 4200 },
        { label: "Horas extras", amount: 320 },
        { label: "Bonus de metas", amount: 500 },
      ],
      deductions: [
        { label: "INSS", amount: 451.2 },
        { label: "Vale transporte", amount: 252 },
        { label: "Plano de saude", amount: 189.9 },
      ],
    }),
    createPaymentRecord({
      competency: "2026-02",
      payDate: "2026-02-28T12:00:00.000Z",
      status: "Pago",
      earnings: [
        { label: "Salario base", amount: 4200 },
        { label: "Horas extras", amount: 210 },
        { label: "Bonus", amount: 250 },
      ],
      deductions: [
        { label: "INSS", amount: 438.9 },
        { label: "Vale transporte", amount: 252 },
        { label: "Plano de saude", amount: 189.9 },
      ],
    }),
    createPaymentRecord({
      competency: "2026-01",
      payDate: "2026-01-31T12:00:00.000Z",
      status: "Pendente",
      earnings: [
        { label: "Salario base", amount: 4200 },
        { label: "Horas extras", amount: 180 },
        { label: "Bonus", amount: 0 },
      ],
      deductions: [
        { label: "INSS", amount: 432.1 },
        { label: "Vale transporte", amount: 252 },
        { label: "Plano de saude", amount: 189.9 },
      ],
    }),
  ];
}

function PaymentDetailsTable({ payment }: { payment: PaymentRecord }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Descricao</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payment.earnings.map((item) => (
          <TableRow key={`${payment.id}-earning-${item.label}`}>
            <TableCell className="font-medium">{item.label}</TableCell>
            <TableCell>
              <Badge className="bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/15 dark:text-emerald-200">
                Ganho
              </Badge>
            </TableCell>
            <TableCell className="text-right text-emerald-700 dark:text-emerald-200">
              {formatCurrency(item.amount)}
            </TableCell>
          </TableRow>
        ))}

        {payment.deductions.map((item) => (
          <TableRow key={`${payment.id}-deduction-${item.label}`}>
            <TableCell className="font-medium">{item.label}</TableCell>
            <TableCell>
              <Badge className="bg-rose-500/15 text-rose-700 hover:bg-rose-500/15 dark:text-rose-200">
                Desconto
              </Badge>
            </TableCell>
            <TableCell className="text-right text-rose-700 dark:text-rose-200">
              - {formatCurrency(item.amount)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total liquido</TableCell>
          <TableCell className="text-right font-semibold">
            {formatCurrency(payment.netSalary)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default function PaymentPage() {
  const session = authClient.useSession();
  const storageKey = buildStorageKey(session.data?.user.id);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);

  const form = useForm<PaymentFilterForm>({
    defaultValues: DEFAULT_FORM_VALUES,
  });

  useEffect(() => {
    const storedValue = window.localStorage.getItem(storageKey);

    if (!storedValue) {
      const mockPayments = getMockPayments();
      window.localStorage.setItem(storageKey, JSON.stringify(mockPayments));
      setPayments(mockPayments);
      form.setValue("competency", mockPayments[0]?.competency ?? "");
      return;
    }

    try {
      const parsed = JSON.parse(storedValue) as PaymentRecord[];
      setPayments(parsed);
      form.setValue("competency", parsed[0]?.competency ?? "");
    } catch {
      const mockPayments = getMockPayments();
      window.localStorage.removeItem(storageKey);
      window.localStorage.setItem(storageKey, JSON.stringify(mockPayments));
      setPayments(mockPayments);
      form.setValue("competency", mockPayments[0]?.competency ?? "");
    }
  }, [form, storageKey]);

  const selectedCompetency = form.watch("competency");
  const selectedPayment =
    payments.find((payment) => payment.competency === selectedCompetency) ??
    payments[0];
  const paymentHistory = payments.filter(
    (payment) => payment.id !== selectedPayment?.id,
  );

  function handleDownloadPayslip() {
    if (!selectedPayment) {
      toast.error("Nenhum holerite encontrado para download.");
      return;
    }

    toast.success(
      "Abrindo a janela de impressao para salvar o holerite em PDF.",
    );
    window.print();
  }

  return (
    <main className="min-h-screen px-4 py-8 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <DashboardHero
          title="Pagamentos e Holerites"
          subtitle="Folha de pagamento"
          description="Consulte o resumo salarial, revise os ganhos e descontos do seu
                holerite e acompanhe os pagamentos anteriores em um unico lugar."
        />

        <Card className="py-0">
          <CardHeader className="border-b py-5">
            <CardTitle className="flex items-center gap-2">
              <HugeiconsIcon icon={Calendar03Icon} className="size-5" />
              Competencia selecionada
            </CardTitle>
            <CardDescription>
              Os dados sao carregados com mocks e persistidos neste navegador
              por usuario.
            </CardDescription>
          </CardHeader>
          <CardContent className="py-5">
            <form className="space-y-5">
              <FieldGroup>
                <Controller
                  name="competency"
                  control={form.control}
                  render={({ field }) => (
                    <Field>
                      <FieldLabel htmlFor="payment-competency">
                        Competencia
                      </FieldLabel>
                      <NativeSelect
                        id="payment-competency"
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        className="w-full"
                      >
                        {payments.map((payment) => (
                          <NativeSelectOption
                            key={payment.id}
                            value={payment.competency}
                          >
                            {formatCompetency(payment.competency)}
                          </NativeSelectOption>
                        ))}
                      </NativeSelect>
                      <FieldDescription>
                        Selecione o mes para atualizar o resumo, o holerite e o
                        historico.
                      </FieldDescription>
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        {selectedPayment ? (
          <>
            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
              <Card className="py-0">
                <CardHeader className="pb-2">
                  <CardDescription>Salario liquido</CardDescription>
                  <CardTitle className="text-2xl">
                    {formatCurrency(selectedPayment.netSalary)}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card className="py-0">
                <CardHeader className="pb-2">
                  <CardDescription>Salario bruto</CardDescription>
                  <CardTitle className="text-2xl">
                    {formatCurrency(selectedPayment.grossSalary)}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card className="py-0">
                <CardHeader className="pb-2">
                  <CardDescription>Descontos</CardDescription>
                  <CardTitle className="text-2xl">
                    {formatCurrency(selectedPayment.totalDeductions)}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card className="py-0">
                <CardHeader className="pb-2">
                  <CardDescription>Data de pagamento</CardDescription>
                  <CardTitle className="text-base leading-6">
                    {formatDate(selectedPayment.payDate)}
                  </CardTitle>
                </CardHeader>
              </Card>

              <Card className="py-0">
                <CardHeader className="pb-2">
                  <CardDescription>Status</CardDescription>
                  <div>
                    <Badge
                      className={getStatusBadgeClassName(
                        selectedPayment.status,
                      )}
                    >
                      {selectedPayment.status}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            </section>

            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <Card className="py-0">
                <CardHeader className="border-b py-5">
                  <CardTitle className="flex items-center gap-2">
                    <HugeiconsIcon icon={Invoice03Icon} className="size-5" />
                    Holerite detalhado
                  </CardTitle>
                  <CardDescription>
                    Resumo completo de ganhos e descontos da competencia de{" "}
                    {formatCompetency(selectedPayment.competency)}.
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-5">
                  <PaymentDetailsTable payment={selectedPayment} />
                </CardContent>
                <CardFooter className="justify-end gap-3">
                  <Button type="button" onClick={handleDownloadPayslip}>
                    <HugeiconsIcon icon={FileDownloadIcon} className="size-4" />
                    Baixar PDF do holerite
                  </Button>
                </CardFooter>
              </Card>

              <Card className="py-0">
                <CardHeader className="border-b py-5">
                  <CardTitle className="flex items-center gap-2">
                    <HugeiconsIcon icon={Dollar01Icon} className="size-5" />
                    Resumo da folha
                  </CardTitle>
                  <CardDescription>
                    Visao consolidada do pagamento selecionado.
                  </CardDescription>
                </CardHeader>
                <CardContent className="py-5">
                  <div className="grid gap-4">
                    <div className="rounded-2xl border bg-background p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Competencia
                      </p>
                      <p className="mt-2 text-lg font-semibold text-foreground">
                        {formatCompetency(selectedPayment.competency)}
                      </p>
                    </div>

                    <div className="rounded-2xl border bg-background p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Ganhos totais
                      </p>
                      <p className="mt-2 text-lg font-semibold text-emerald-700 dark:text-emerald-200">
                        {formatCurrency(selectedPayment.grossSalary)}
                      </p>
                    </div>

                    <div className="rounded-2xl border bg-background p-4">
                      <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                        Descontos totais
                      </p>
                      <p className="mt-2 text-lg font-semibold text-rose-700 dark:text-rose-200">
                        {formatCurrency(selectedPayment.totalDeductions)}
                      </p>
                    </div>

                    <div className="rounded-2xl border bg-slate-950 p-5 text-slate-100">
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        Valor final recebido
                      </p>
                      <p className="mt-3 text-3xl font-semibold">
                        {formatCurrency(selectedPayment.netSalary)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="py-0">
              <CardHeader className="border-b py-5">
                <CardTitle className="flex items-center gap-2">
                  <HugeiconsIcon icon={Wallet02Icon} className="size-5" />
                  Historico de pagamentos
                </CardTitle>
                <CardDescription>
                  Consulte os meses anteriores e abra os detalhes do holerite.
                </CardDescription>
              </CardHeader>
              <CardContent className="py-5">
                {paymentHistory.length ? (
                  <div className="grid gap-4">
                    {paymentHistory.map((payment) => (
                      <article
                        key={payment.id}
                        className="rounded-2xl border bg-background p-4 shadow-sm"
                      >
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h2 className="text-base font-semibold text-foreground">
                                {formatCompetency(payment.competency)}
                              </h2>
                              <Badge
                                className={getStatusBadgeClassName(
                                  payment.status,
                                )}
                              >
                                {payment.status}
                              </Badge>
                            </div>

                            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                              <span className="rounded-full border bg-muted/40 px-3 py-1 text-foreground">
                                Recebido {formatCurrency(payment.netSalary)}
                              </span>
                              <span className="rounded-full border bg-muted/40 px-3 py-1 text-foreground">
                                Pago em {formatDate(payment.payDate)}
                              </span>
                            </div>
                          </div>

                          <Dialog>
                            <DialogTrigger
                              render={<Button variant="outline" />}
                            >
                              <HugeiconsIcon
                                icon={ArrowDown01Icon}
                                className="size-4"
                              />
                              Ver detalhes
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl">
                              <DialogHeader>
                                <DialogTitle>
                                  Holerite de{" "}
                                  {formatCompetency(payment.competency)}
                                </DialogTitle>
                                <DialogDescription>
                                  Pagamento com status{" "}
                                  {payment.status.toLowerCase()} e credito
                                  previsto para {formatDate(payment.payDate)}.
                                </DialogDescription>
                              </DialogHeader>

                              <div className="grid gap-4 md:grid-cols-3">
                                <div className="rounded-2xl border bg-background p-4">
                                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                                    Bruto
                                  </p>
                                  <p className="mt-2 text-base font-semibold text-foreground">
                                    {formatCurrency(payment.grossSalary)}
                                  </p>
                                </div>

                                <div className="rounded-2xl border bg-background p-4">
                                  <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                                    Descontos
                                  </p>
                                  <p className="mt-2 text-base font-semibold text-foreground">
                                    {formatCurrency(payment.totalDeductions)}
                                  </p>
                                </div>

                                <div className="rounded-2xl border bg-slate-950 p-4 text-slate-100">
                                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                                    Liquido
                                  </p>
                                  <p className="mt-2 text-base font-semibold">
                                    {formatCurrency(payment.netSalary)}
                                  </p>
                                </div>
                              </div>

                              <PaymentDetailsTable payment={payment} />

                              <DialogFooter showCloseButton />
                            </DialogContent>
                          </Dialog>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                    Nenhum pagamento anterior disponivel neste navegador.
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="rounded-2xl border border-dashed bg-muted/30 p-8 text-center text-sm text-muted-foreground">
            Nenhum pagamento disponivel no momento.
          </div>
        )}
      </div>
    </main>
  );
}
