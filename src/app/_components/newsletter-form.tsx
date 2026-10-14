"use client";

import { useState, type FormEvent } from "react";
import { Button, Field, Input, Switch, useToast } from "@balaio/ui";

/** Exemplo de componente interativo do app usando o design system. */
export function NewsletterForm() {
  const { toast } = useToast();
  const [error, setError] = useState<string>();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email")?.toString() ?? "";
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Informe um e-mail válido, ex.: voce@exemplo.com");
      return;
    }
    setError(undefined);
    toast({
      title: "Inscrição feita!",
      description: `Vamos mandar as ofertas para ${email}.`,
      variant: "success",
    });
    event.currentTarget.reset();
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Field label="E-mail" hint="Uma vez por semana, sem spam." error={error} required>
        <Input name="email" type="email" autoComplete="email" placeholder="voce@exemplo.com" />
      </Field>
      <Switch name="ofertas-relampago" label="Também quero ofertas relâmpago" />
      <Button type="submit" variant="accent" className="self-start">
        Quero receber
      </Button>
    </form>
  );
}
