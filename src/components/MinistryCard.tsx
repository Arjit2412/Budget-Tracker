import Link from "next/link";
import Image from "next/image";

interface NavigationCardProps {
  title: string;
  subtitle?: string;
  desc?: string;
  image: string;
  href: string;
}

const MinistryCard = ({ title, subtitle, desc, image, href }: NavigationCardProps) => {
  return (
    <Link href={href} className="block">
      <div className="flex flex-col gap-4 glass-card card-hover rounded-xl overflow-hidden max-w-sm mx-auto">
        <div className="h-48 overflow-hidden relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 ">
          <h3 className="text-xl font-semibold mb-2 ">{title}</h3>
          {subtitle && (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
          {desc && (
            <p className="text-muted-foreground">{desc}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MinistryCard;