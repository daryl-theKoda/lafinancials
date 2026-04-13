interface SkeletonCardProps {
  className?: string;
  lines?: number;
  showIcon?: boolean;
}

const SkeletonCard = ({ className = '', lines = 3, showIcon = true }: SkeletonCardProps) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      {showIcon && (
        <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse mb-4" />
      )}
      <div className="space-y-3">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
        {Array.from({ length: lines - 1 }).map((_, i) => (
          <div
            key={i}
            className={`h-4 bg-gray-200 rounded animate-pulse ${i === lines - 2 ? 'w-5/6' : 'w-full'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SkeletonCard;
