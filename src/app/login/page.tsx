"use client";
import toast from "react-hot-toast";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useActionState } from "react";
import { signInAsVisitor } from "@/_lib/actions/auth/signIn-as-visitor";
import { signInAsAdmin } from "@/_lib/actions/auth/signIn-as-admin";
import { useFormState, useFormStatus } from "react-dom";

const FormButton = () => {
  const { pending, data } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-b from-orange-500 to-orange-400 text-black font-bold py-2 rounded hover:brightness-110 transition"
    >
      {pending ? "Entrando..." : "Entrar como Admin"}
    </button>
  );
};

const Login = () => {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();
  const [formState, formAction] = useActionState(signInAsAdmin, {
    ok: false,
    error: "",
    data: null,
  });

  React.useEffect(() => {
    if (formState?.ok) {
      toast.success("Login realizado com sucesso!");
      router.push("/"); // redireciona manualmente
    } else if (formState?.error) {
      toast.error(formState.error);
    }
  }, [formState, router]);

  const handleVisitor = () => {
    startTransition(async () => {
      const { success } = await signInAsVisitor();
      if (success) {
        toast.success("Entrando como visitante");
        router.push("/");
      } else {
        toast.error("Erro ao entrar como visitante");
      }
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-azul-900 relative overflow-hidden">
      <Image
        src="/assets/Bg.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-10 -z-10"
        fill
      />

      <div className="bg-azul-950 border border-sky-900 rounded-xl shadow-xl px-8 py-10 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">
          Antes de Começar
        </h1>
        <p className="text-slate-400 text-sm mb-6 text-center">
          Faça login como admin ou entre como visitante
        </p>

        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-slate-400 mb-1 text-sm">Email</label>
            <input
              name="email"
              type="email"
              placeholder="Digite seu email"
              className="w-full px-4 py-2 rounded bg-azul-900 border border-sky-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-slate-400 mb-1 text-sm">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite admin"
              className="w-full px-4 py-2 rounded bg-azul-900 border border-sky-900 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <FormButton />
        </form>

        <div className="mt-6">
          <button
            onClick={handleVisitor}
            className="w-full border border-sky-800 text-slate-300 hover:border-orange-500 hover:text-orange-400 py-2 rounded transition"
          >
            {isPending ? "Carregando..." : "Entrar como Visitante"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
