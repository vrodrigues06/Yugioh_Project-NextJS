// components/BackLink.tsx
import Link from "next/link";

interface BackLinkProps {
  href: string;
  children?: React.ReactNode;
}

export default function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="text-orange-500 text-xs hover:underline justify-self-start"
    >
      🠔 {children ?? "Voltar"}
    </Link>
  );
}
