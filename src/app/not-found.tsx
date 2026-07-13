import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0f0702] flex items-center justify-center px-4 text-white">

      <div className="max-w-2xl text-center">

        {/* 404 */}
        <h1 className="text-[120px] md:text-[170px] font-bold leading-none text-[#d89d33] drop-shadow-lg">
          404
        </h1>

        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-serif text-[#f8f1e7] mt-4">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-lg mt-5 leading-relaxed">
          The page you are looking for does not exist or may
          have been moved.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">

          <Link
            href="/"
            className="btn rounded-full bg-[#d89d33] hover:bg-[#ebb247] border-none text-black text-lg px-8"
          >
            Back to Home
          </Link>

          <Link
            href="/rooms"
            className="btn rounded-full btn-outline border-[#d89d33] text-[#d89d33] hover:bg-[#d89d33] hover:text-black text-lg px-8"
          >
            Browse Rooms
          </Link>

        </div>

      </div>
    </div>
  );
}