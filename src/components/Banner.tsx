import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Banner = () => {
  return (
    <div>
      <div className="hero  w-full  min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse max-w-6xl mx-auto gap-10 lg:gap-20 px-4">
          <Image
            src={"/assets/image-1.jpg"}
            alt="banner"
            height={600}
            width={600}
            className="w-full max-w-sm lg:max-w-lg object-cover rounded-3xl shadow-2xl"
          ></Image>

          <div className="space-y-7">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold ">
              Find Your
              <span className="text-[#da9e38] font-serif italic"> Perfect </span>
               Focus Zone
            </h1>
            <p className="text-[#e7d8c3]">
              Book elegant study rooms, meeting spaces, and private environments
              designed for productivity — by the hour, in cities you love.
            </p>
            <div className="flex gap-5">
              <Link
                href={"/rooms"}
                className="btn btn-sm lg:btn-md bg-[#da9e38] shadow-none text-[#1e1711] rounded-xl border-none"
              >
                Explore Rooms <FaArrowRight />
              </Link>
              <Link
                href={"/register"}
                className="btn btn-sm lg:btn-md btn-outline btn-warning rounded-full "
              >
                Become a host
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
