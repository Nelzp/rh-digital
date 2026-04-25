"use client";

import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
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
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import {
  type SignUpSchema,
  signUpSchema,
} from "@/types/schemas/sign-up-schema";

export default function SignUp() {
  const router = useRouter();

  const form = useForm<SignUpSchema>({
    resolver: standardSchemaResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function handleSignUp(data: SignUpSchema) {
    await authClient.signUp.email(data, {
      onSuccess() {
        toast.success(
          "Conta criada com sucesso! Verifique seu email para ativar a conta.",
        );
        form.reset();
        router.push("/dashboard");
      },
      onError({ error }) {
        toast.error(
          error.message || "Ocorreu um erro ao criar a conta. Tente novamente.",
        );
        console.error("Error signing up:", error);
      },
    });
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="mb-3">Crie uma conta</CardTitle>
        <CardDescription>
          Preencha as informações abaixo para criar uma conta.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-up" onSubmit={form.handleSubmit(handleSignUp)}>
          <FieldGroup>
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-name">Nome</FieldLabel>
                  <Input
                    id="sign-up-name"
                    type="text"
                    placeholder="John Doe"
                    aria-invalid={fieldState.invalid}
                    required
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-email">E-mail</FieldLabel>
                  <Input
                    id="sign-up-email"
                    type="email"
                    placeholder="Digite seu email"
                    aria-invalid={fieldState.invalid}
                    required
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-up-password">Senha</FieldLabel>
                  <Input
                    id="sign-up-password"
                    type="password"
                    placeholder="*******"
                    aria-invalid={fieldState.invalid}
                    required
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" form="sign-up">
            Cadastrar
          </Button>
          <span className="flex items-center gap-1 text-sm justify-center mt-3">
            Possui uma conta?
            <Link
              href="/auth/sign-in"
              className="text-blue-500 hover:underline"
            >
              Faça login
            </Link>
          </span>
        </Field>
      </CardFooter>
    </Card>
  );
}
