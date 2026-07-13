export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0f0702] flex items-center justify-center px-4">

      <div className="flex flex-col items-center">

        {/* Spinner */}
        <div className="relative w-24 h-24">

          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-[#3b2618]"></div>

          {/* Animated Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-t-[#d89d33] border-r-[#d89d33] border-b-transparent border-l-transparent animate-spin"></div>

          {/* Center Glow */}
          <div className="absolute inset-4 rounded-full bg-[#1a0f08] border border-[#2d1f12] flex items-center justify-center shadow-lg shadow-[#d89d33]/20">
            <span className="text-[#d89d33] text-xl font-bold">
              FR
            </span>
          </div>

        </div>

        {/* Text */}
        <div className="mt-8 text-center">

          <h2 className="text-3xl font-serif text-[#f8f1e7]">
            Loading...
          </h2>

          <p className="text-gray-400 mt-2 tracking-wide">
            Preparing your workspace experience
          </p>

        </div>

      </div>
    </div>
  );
}