import { Colocacao } from "@/@types/personagem";
import { setEmoji } from "@/functions/setEmoji";

type TitulosMundialProps = {
  hasTitulo: boolean;
  titulos: Colocacao[];
  vices: Colocacao[];
};

export default function TitulosMundial({
  hasTitulo,
  titulos,
  vices,
}: TitulosMundialProps) {
  return (
    <div className="flex gap-1">
      {hasTitulo && <span className="text-xs text-slate-500">Mundial | </span>}

      <div className="flex gap-1">
        {titulos.map((t, i) => (
          <span key={i}> {setEmoji("Mundial-C")} </span>
        ))}
      </div>
      <div className="flex gap-1">
        {vices.map((t, i) => (
          <span key={i}> {setEmoji("Mundial-V")} </span>
        ))}
      </div>
    </div>
  );
}
