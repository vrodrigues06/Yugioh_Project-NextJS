import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div>
      <Link href="/">
        <Image
          src="/assets/Logo.svg"
          alt="Logo"
          priority
          className="min-w-20 mt-2"
          width={114}
          height={51}
        />
      </Link>
    </div>
  );
};

export default Logo;
