import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div>
      <footer className="border-t border-[#2b1d0f] bg-[#120904] text-white">
  <div className="max-w-7xl mx-auto px-6 py-14">
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      
      {/* Brand */}
      <div>
        <div className="flex items-center  mb-4">
          <Image 
             src={'/assets/logo.png'}
             alt='logo'
             height={65}
             width={65}
             >
             </Image>

          <h2 className="text-2xl font-bold">
            <span className="text-[#d89d33]">Focus</span>Room
          </h2>
        </div>

        <p className="text-gray-400 leading-relaxed">
          Premium study rooms and private focus spaces designed for
          productivity, comfort, and creativity.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="text-xl font-semibold mb-5 text-[#d89d33]">
          Quick Links
        </h3>

        <ul className="space-y-3 text-gray-400">
          <li>
            <Link
              href="/"
              className="hover:text-[#d89d33] transition duration-300"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/rooms"
              className="hover:text-[#d89d33] transition duration-300"
            >
              Rooms
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="hover:text-[#d89d33] transition duration-300"
            >
              About Us
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="hover:text-[#d89d33] transition duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h3 className="text-xl font-semibold mb-5 text-[#d89d33]">
          Support
        </h3>

        <ul className="space-y-3 text-gray-400">
          <li className="hover:text-[#d89d33] transition duration-300 cursor-pointer">
            Privacy Policy
          </li>

          <li className="hover:text-[#d89d33] transition duration-300 cursor-pointer">
            Terms & Conditions
          </li>

          <li className="hover:text-[#d89d33] transition duration-300 cursor-pointer">
            Help Center
          </li>

          <li className="hover:text-[#d89d33] transition duration-300 cursor-pointer">
            FAQs
          </li>
        </ul>
      </div>

      {/* Newsletter */}
      <div>
        <h3 className="text-xl font-semibold mb-5 text-[#d89d33]">
          Stay Updated
        </h3>

        <p className="text-gray-400 mb-4">
          Get updates about new rooms and productivity spaces.
        </p>

        <div className="flex items-center border border-[#3b2a18] rounded-full overflow-hidden">
          <input
            type="email"
            placeholder="Your email"
            className="bg-transparent px-4 py-3 w-full outline-none text-sm"
          />

          <button className="bg-[#d89d33] text-black px-5 py-3 font-semibold hover:bg-[#f0b44b] transition">
            Join
          </button>
        </div>
      </div>
    </div>

    {/* Bottom */}
    <div className="border-t border-[#2b1d0f] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
      
      <p className="text-gray-500 text-sm">
        © 2026 FocusRoom. All rights reserved.
      </p>

      <div className="flex items-center gap-5 text-gray-400 text-lg">
        <a
          href="#"
          className="hover:text-[#d89d33] transition duration-300"
        >
          Facebook
        </a>

        <a
          href="#"
          className="hover:text-[#d89d33] transition duration-300"
        >
          Instagram
        </a>

        <a
          href="#"
          className="hover:text-[#d89d33] transition duration-300"
        >
          Twitter
        </a>
      </div>
    </div>
  </div>
</footer>
    </div>
  );
};

export default Footer;