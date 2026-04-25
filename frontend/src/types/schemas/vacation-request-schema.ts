import { z } from "zod";

export const vacationRequestSchema = z.object({
  startDate: z.string().min(1, "Selecione a data inicial."),
  endDate: z.string().min(1, "Selecione a data final."),
  quantityOfDays: z
    .number()
    .int()
    .min(1, "Selecione um periodo valido para calcular os dias."),
  requestType: z.enum(
    ["Ferias integrais", "Fracionamento", "Abono pecuniario"],
    {
      error: "Selecione o tipo da solicitacao.",
    },
  ),
  observations: z
    .string()
    .max(500, "As observacoes devem ter no maximo 500 caracteres.")
    .optional(),
  status: z.literal("Pendente para aprovacao"),
});

export type VacationRequestSchema = z.infer<typeof vacationRequestSchema>;
