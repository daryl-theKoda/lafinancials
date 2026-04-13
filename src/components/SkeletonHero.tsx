const SkeletonHero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-hero text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 border border-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-white/20 rounded-full animate-pulse"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10 pt-20 pb-10 sm:pt-24 sm:pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <div className="h-16 sm:h-20 bg-white/20 rounded-lg animate-pulse mb-2 mx-auto w-3/4"></div>
            <div className="h-12 sm:h-16 bg-white/20 rounded-lg animate-pulse mx-auto w-2/3"></div>
          </div>
          
          <div className="h-6 bg-white/20 rounded-lg animate-pulse mb-8 mx-auto max-w-3xl"></div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12">
            <div className="h-12 bg-white/20 rounded-lg animate-pulse w-40 sm:w-48 mx-auto"></div>
            <div className="h-12 bg-white/20 rounded-lg animate-pulse w-40 sm:w-48 mx-auto"></div>
          </div>

          {/* Key Features Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-white/10 rounded-full animate-pulse mb-4"></div>
                <div className="h-5 bg-white/20 rounded animate-pulse mb-2 w-3/4"></div>
                <div className="h-4 bg-white/20 rounded animate-pulse w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkeletonHero;
