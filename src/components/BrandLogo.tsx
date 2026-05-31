import Image from "next/image";

type BrandLogoProps = {
  className?: string;
};

export default function BrandLogo({ className = "site-logo" }: BrandLogoProps) {
  return (
    <Image
      src="/logo-mamy-mimo-davu.jpg"
      alt=""
      width={900}
      height={900}
      className={className}
      priority
    />
  );
}
