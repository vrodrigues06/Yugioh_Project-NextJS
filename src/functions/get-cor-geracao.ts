export function getCorGeracao(geracao?: string): string {
  switch (geracao?.toLowerCase()) {
    case "gx":
      return "text-purple-500";
    case "dm":
      return "text-orange-400";
    case "5ds":
      return "text-sky-500";
    default:
      return "text-white";
  }
}
