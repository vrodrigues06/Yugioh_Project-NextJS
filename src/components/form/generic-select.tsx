import { FieldValues, UseFormRegister } from "react-hook-form";
import { createTorneioData } from "../torneios/painel-torneio/painel-torneio-model";

interface SelectProps extends React.ComponentProps<"select"> {
  label: string;
  id: string;
  register: UseFormRegister<FieldValues>;
  options: string[];
  geracao?: string;
}

export default function GenericSelect({
  label,
  id,
  register,
  options,
  geracao,
}: SelectProps) {
  return (
    <div className="h-10 sm:h-16">
      <div className="flex items-center gap-2">
        <label
          className="font-semibold text-sky-300 text-sm xs:text-md "
          htmlFor={id}
        >
          {label}
        </label>
        <select
          id={id}
          {...register(id)}
          className="bg-azul-800 py-1 outline outline-sky-800 text-sky-300 rounded-md text-xs xs:text-md"
        >
          <option value={geracao}>{geracao?.toUpperCase()}</option>
          {options.map((item) => {
            if (item === geracao) return;
            return (
              <option key={item} value={item}>
                {item.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}
