import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ size = "default" }: { size?: "small" | "default" | "large" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8", 
    large: "w-12 h-12"
  };

  return (
    <div className="flex items-center justify-center p-8">
      <Loader2 className={`animate-spin text-finance-blue ${sizeClasses[size]}`} />
    </div>
  );
};

export default LoadingSpinner;
