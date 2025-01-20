import { Link } from "react-router-dom";

interface NavigationCardProps {
  title: string;
  subtitle?: string;
  image: string;
  to: string;
}

const NavigationCard = ({ title, subtitle, image, to }: NavigationCardProps) => {
  return (
    <Link to={to} className="block">
      <div className="glass-card card-hover rounded-xl overflow-hidden max-w-sm mx-auto">
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          {subtitle && (
            <p className="text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default NavigationCard;