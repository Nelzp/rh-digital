import { z } from "zod";

export const timeClockSchema = z.object({
  reason: z.enum(["Entrada", "Saida", "Almoco"], {
    error: "Selecione o motivo do ponto.",
  }),
});

export type TimeClockSchema = z.infer<typeof timeClockSchema>;
