import { Colocacao } from "@/@types/personagem";
import { setEmoji } from "@/functions/setEmoji";

type TitulosNacionalProps = {
  hasTitulo: boolean;
  titulos: Colocacao[];
  vices: Colocacao[];
};

export default function TitulosNacional({
  hasTitulo,
  titulos,
  vices,
}: TitulosNacionalProps) {
  return (
    <div className="flex gap-1 mb-1 flex-wrap">
      {hasTitulo && <span className="text-xs text-slate-500">Nacional | </span>}

      <div className="flex gap-1">
        {titulos.map((t, i) => (
          <span key={i}>{setEmoji(t.classificacao)}</span>
        ))}
      </div>
      <div className="flex gap-1">
        {vices.map((t, i) => (
          <span key={i}>{setEmoji(t.classificacao)}</span>
        ))}
      </div>
    </div>
  );
}
