"use client";

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
  type SignInSchema,
  signInSchema,
} from "@/types/schemas/sign-in-schema";
import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SignIn() {
  const router = useRouter();
  const form = useForm<SignInSchema>({
    resolver: standardSchemaResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSignIn(data: SignInSchema) {
    await authClient.signIn.email(data, {
      onSuccess() {
        toast.success("Login bem-sucedido!");
        form.reset();
        router.push("/");
      },
      onError({ error }) {
        toast.error(
          error.message || "Ocorreu um erro ao fazer login. Tente novamente.",
        );
        console.error("Error signing in:", error);
      },
    });
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="mb-3">Entrar</CardTitle>
        <CardDescription>
          Preencha as informações abaixo para entrar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="sign-in" onSubmit={form.handleSubmit(handleSignIn)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="sign-in-email">E-mail</FieldLabel>
                  <Input
                    id="sign-in-email"
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
                  <FieldLabel htmlFor="sign-in-password">Senha</FieldLabel>
                  <Input
                    id="sign-in-password"
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
          <Button type="submit" form="sign-in">
            Entrar
          </Button>
          <span className="flex items-center gap-1 text-sm justify-center mt-3">
            Não possui uma conta?
            <Link
              href="/auth/sign-up"
              className="text-blue-500 hover:underline"
            >
              Cadastre-se
            </Link>
          </span>
        </Field>
      </CardFooter>
    </Card>
  );
}
