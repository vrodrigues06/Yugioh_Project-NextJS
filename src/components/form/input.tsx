import { PersonagemFormData } from "@/schemas/personagem-schema";
import React from "react";
import { UseFormRegister, FieldErrors, useForm } from "react-hook-form";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  register: UseFormRegister<PersonagemFormData>;
  errors: FieldErrors<PersonagemFormData>;
  id: keyof PersonagemFormData;
}

const Input = ({ label, register, errors, id, ...rest }: InputProps) => {
  return (
    <div className="h-10 sm:h-16">
      <div className="flex gap-2 items-center">
        <label
          className="font-semibold text-sky-300 text-sm xs:text-md "
          htmlFor={id}
        >
          {label}
        </label>
        <input
          className="bg-azul-800 p-1 focus:outline-none focus:ring outline-sky-800 text-sky-300 rounded-md text-xs xs:text-md max-w-xs"
          type="text"
          autoComplete="off"
          {...rest}
          {...register(id)}
        />
      </div>
      {errors[id] && (
        <span className="text-red-500 mt-2 block text-xs xs:text-sm animate-slideDown">
          {typeof errors[id]?.message === "string" && errors[id]?.message}
        </span>
      )}
    </div>
  );
};

export default Input;
