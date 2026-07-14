"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoSunnySharp } from "react-icons/io5";
import NavLink from "./NavLink";
import { authClient } from "@/lib/auth-client";

const links = (
  <>
    <NavLink href={"/"}>
      <li className="rounded-2xl py-3 text-base text-gray-200 hover:bg-[#2b1a11] hover:text-[#da9e38] transition-all duration-300">
        Home
      </li>
    </NavLink>
    <NavLink href={"/rooms"}>
      <li className="rounded-2xl py-3 text-base text-gray-200 hover:bg-[#2b1a11] hover:text-[#da9e38] transition-all duration-300">
        Rooms
      </li>
    </NavLink>
    <NavLink href={"/availableroom"}>
      <li className="rounded-2xl py-3 text-base text-gray-200 hover:bg-[#2b1a11] hover:text-[#da9e38] transition-all duration-300">
        Available Rooms
      </li>
    </NavLink>
  </>
);

const authLinks = (
  <>
    <li>
      <Link
        href={"/login"}
        className="btn shadow-none  btn-sm lg:btn-md text-sm lg:text-base bg-[#da9e38] text-[#1e1711] lg:px-5 rounded-xl border-none"
      >
        Login
      </Link>
    </li>
    <li className="hidden lg:inline-block">
      <Link
        href={"/register"}
        className="btn shadow-none  btn-sm lg:btn-md text-sm lg:text-base bg-[#da9e38] text-[#1e1711] lg:px-5 rounded-xl border-none"
      >
        Register
      </Link>
    </li>
  </>
);
const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login";
        },
      },
    });
  };
  return (
    <div className="bgColor2 sticky top-0 z-50 bg-transparent">
      <div className="navbar  text-gray-50 max-w-6xl mx-auto shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="lg:hidden btn btn-square btn-ghost btn-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-[#1a120d] border border-[#3b2618] rounded-3xl z-[1] mt-4 w-72 p-3 shadow-2xl shadow-black/40"
            >
              {user ? (
                <>
                  {links}
                  <NavLink href={"/add-room"}>
                    <li className="rounded-2xl py-3 text-base text-gray-200 hover:bg-[#2b1a11] hover:text-[#da9e38] transition-all duration-300">
                      Add Room
                    </li>
                  </NavLink>
                  <NavLink href={"/my-listings"}>
                    <li className="rounded-2xl py-3 text-base text-gray-200 hover:bg-[#2b1a11] hover:text-[#da9e38] transition-all duration-300">
                      My Listings
                    </li>
                  </NavLink>
                  <NavLink href={"/my-bookings"}>
                    <li className="rounded-2xl py-3 text-base text-gray-200 hover:bg-[#2b1a11] hover:text-[#da9e38] transition-all duration-300">
                      My Bookings
                    </li>
                  </NavLink>
                </>
              ) : (
                <> {links}</>
              )}
            </ul>
          </div>
          <div className="flex items-center gap-1 lg:gap-2">
            <Image
              src={"/assets/logo.png"}
              alt="logo"
              height={60}
              width={60}
            ></Image>
            {/* <div className="flex-1"> */}

            <Link href={"/"} className=" text-lg lg:text-xl font-extrabold">
              <span className="text-[#da9e38]">Focus</span>Room{" "}
            </Link>
            {/* </div> */}
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal space-x-4 px-1">
            {user ? (
              <>
                <NavLink href={"/"}>
                  <li>Home</li>
                </NavLink>
                <NavLink href={"/rooms"}>
                  <li>Rooms</li>
                </NavLink>
                <NavLink href={"/add-room"}>
                  <li>Add Room</li>
                </NavLink>
                <NavLink href={"/my-listings"}>
                  <li>My Listings</li>
                </NavLink>
                <NavLink href={"/my-bookings"}>
                  <li>My Bookings</li>
                </NavLink>
              </>
            ) : (
              <>
                {" "}
                <NavLink href={"/"}>
                  <li>Home</li>
                </NavLink>
                <NavLink href={"/rooms"}>
                  <li>Rooms</li>
                </NavLink>
              </>
            )}
          </ul>
        </div>
        <div className="navbar-end ">
          <div className="flex items-center gap-2 lg:gap-4">
            <a className="text-[#da9e38] text-lg lg:text-2xl">
              <IoSunnySharp />
            </a>
            {user ? (
              <div className="flex justify-between items-center gap-2">
                <div className="dropdown dropdown-end">
                  {/* Dropdown Button */}
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center gap-3 max-w-55  bg-[#1b130d] hover:bg-[#241811] border border-[#3b2618] px-3 py-2 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                  >
                    {/* Avatar */}
                    {user?.image ? (
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#da9e38]">
                        <Image
                          src={user?.image}
                          alt="user"
                          width={48}
                          height={48}
                          className="rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="avatar placeholder">
                        <div className="bg-[#da9e38] text-[#1b130d] w-12 rounded-full font-bold">
                          <span>{user.name.charAt(0)}</span>
                        </div>
                      </div>
                    )}

                    {/* Name */}
                    <div className="hidden md:block">
                      <h3 className="text-white font-semibold leading-none">
                        {user?.name}
                      </h3>

                      <p className="text-xs text-gray-400">View Profile</p>
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-[#1a120d] border border-[#3b2618] rounded-3xl z-[1] mt-4 w-64 sm:w-72 p-3 shadow-2xl shadow-black/40"
                  >
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-[#2b1a11] mb-2">
                      <h3 className="text-lg font-semibold text-[#f8f1e7]">
                        {user?.name}
                      </h3>

                      <p className="text-sm text-gray-400 truncate">
                        {user?.email}
                      </p>
                    </div>

                    {/* Profile */}
                    <li>
                      <Link
                        href="/my-bookings"
                        className="rounded-2xl py-3 text-base text-gray-200 hover:bg-[#2b1a11] hover:text-[#da9e38] transition-all duration-300"
                      >
                        My Bookings
                      </Link>
                    </li>

                    {/* Settings */}
                    <li>
                      <Link
                        href="/my-listings"
                        className="rounded-2xl py-3 text-base text-gray-200 hover:bg-[#2b1a11] hover:text-[#da9e38] transition-all duration-300"
                      >
                        My Listings
                      </Link>
                    </li>

                    {/* Divider */}
                    <div className="border-t border-[#2b1a11] my-2"></div>

                    {/* Logout */}
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="rounded-2xl py-3 text-base bg-red-500/10 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <ul className="menu menu-horizontal text-lg gap-2 lg:gap-4 px-1">
                {authLinks}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

//  <div className="flex gap-2">
//     <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />

//   </div>

{
  /* <div className="dropdown dropdown-end">
    
       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>

<ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div> */
}
