import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";


const ReadyToBook = () => {
  return (
    <div>
        <div className="hero bg-[#140b05] border border-[#2d1f12] rounded-[40px] my-24">
          <div className="hero-content text-center py-16">
            <div className="max-w-3xl">
              
              <p className="uppercase tracking-[4px] text-sm text-[#b28b5c] mb-3">
                Focus Better Today
              </p>

              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Ready to book your perfect workspace?
              </h2>

              <p className="py-6 text-gray-400 text-lg">
                Explore premium study rooms, meeting spaces, and productivity
                environments built to help you succeed.
              </p>
              <Link href={'/rooms'}>
              
              <button className="btn rounded-full bg-[#d89d33] hover:bg-[#e6b04d] border-none text-black px-10 text-lg">
                Explore Rooms <FaArrowRight />
              </button>
              </Link>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ReadyToBook;