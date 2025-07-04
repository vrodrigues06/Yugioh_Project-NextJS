import Image from "next/image";
import React from "react";

export default function BgWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-azul-900 relative backdrop-blur-3xl min-h-screen overflow-hidden">
      <Image
        src="/assets/Bg.jpg"
        alt=""
        fill
        priority
        fetchPriority="high"
        loading="eager"
        className="absolute inset-0 -z-10 opacity-10 w-full h-full object-cover mix-blend-multiply pointer-events-none"
      />
      {children}
    </div>
  );
}
