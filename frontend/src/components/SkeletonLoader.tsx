import { motion } from 'motion/react';

export default function SkeletonLoader() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen font-sans px-6 md:px-10 py-8 space-y-32 overflow-hidden">
      {/* Navbar Skeleton */}
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="w-32 h-8 bg-white/5 rounded-md animate-pulse" />
        <div className="hidden md:flex gap-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="w-16 h-4 bg-white/5 rounded-md animate-pulse" />
          ))}
        </div>
        <div className="w-24 h-10 bg-white/5 rounded-full animate-pulse hidden md:block" />
      </div>

      {/* Hero Skeleton */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
        <div className="space-y-6">
          <div className="w-32 h-6 bg-white/5 rounded-md animate-pulse" />
          <div className="w-full max-w-md h-16 bg-white/5 rounded-md animate-pulse" />
          <div className="w-3/4 h-16 bg-white/5 rounded-md animate-pulse" />
          <div className="w-full max-w-lg h-24 bg-white/5 rounded-md animate-pulse mt-6" />
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="w-full sm:w-40 h-14 bg-white/5 rounded-full animate-pulse" />
            <div className="w-full sm:w-40 h-14 bg-white/5 rounded-full animate-pulse" />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[85vw] max-w-[520px] aspect-[4/5] md:aspect-auto md:w-[500px] md:h-[660px] lg:w-[540px] lg:h-[720px] bg-white/5 rounded-3xl animate-pulse" />
        </div>
      </div>

      {/* About Skeleton */}
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="w-48 h-12 bg-white/5 rounded-md animate-pulse mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="w-full h-[350px] md:h-[400px] lg:h-[500px] bg-white/5 rounded-3xl animate-pulse" />
          <div className="space-y-6">
            <div className="w-full h-32 bg-white/5 rounded-xl animate-pulse" />
            <div className="grid grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-full h-24 bg-white/5 rounded-xl animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects Skeleton */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="w-48 h-12 bg-white/5 rounded-md animate-pulse mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full h-[450px] bg-white/5 rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>

      {/* Services Skeleton */}
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="w-48 h-12 bg-white/5 rounded-md animate-pulse mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-full h-[300px] bg-white/5 rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
