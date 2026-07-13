'use client'
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";


// export const metadata = {
//   title: "FocusRoom-Register",
//   description: "Find Your Perfect Focus Zone",
// };

const RegisterPage = () => {
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      email: user.email as string,
      password: user.password as string,
      name: user.name as string,
      image: user.image as string,
    });
// console.log(data, "Data")
// console.log(error, "error")

 const password = user.password as string;

    // Password Validation
    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    if (!/[A-Z]/.test(password)) {
      return setError("Password must contain at least one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
      return setError("Password must contain at least one lowercase letter.");
    }

    if (data) {
      toast.success("Registration Successful")
      redirect("/login");
    }

    if (error) {
      // toast
      toast.error("Error");
    }
  };
    const handleGoogleSignin = async () => {
      await authClient.signIn.social({
        provider: "google",
      });
    };



  return (
    <div className="min-h-screen bg-[#120804] flex items-center justify-center px-4 py-10 text-white">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-[#1b0d06] rounded-3xl overflow-hidden border border-[#3b2415] shadow-2xl">
        
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-[#1a0c05] to-[#120804]">
          <div className="flex items-center mb-10">
            <Image 
                           src={'/assets/logo.png'}
                           alt='logo'
                           height={65}
                           width={65}
                           >
                           </Image>

            <h1 className="text-3xl font-bold">
              <span className="text-[#d69b2d]">Focus</span>Room
            </h1>
          </div>

          <h2 className="text-6xl font-bold leading-tight">
            Join Your <br />
            <span className="italic text-[#d69b2d] font-serif">
              Perfect
            </span>{" "}
            Focus Space
          </h2>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            Create your account and access premium study rooms,
            workspaces, and productivity environments built for deep focus.
          </p>

          <div className="mt-10 flex gap-4">
            <button className="btn bg-[#d69b2d] border-none hover:bg-[#e8ac3b] text-black rounded-xl px-8">
              Explore Rooms
            </button>

            <button className="btn btn-outline border-[#d69b2d] text-[#d69b2d] hover:bg-[#d69b2d] hover:text-black rounded-xl px-8">
              Become a Host
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="bg-[#221108] flex items-center justify-center p-8 md:p-14">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-4xl font-bold mb-2">Create Account</h2>
              <p className="text-gray-400">
                Start your productivity journey today.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">

              {/* Name */}
              <div>
                <label className="label">
                  <span className="label-text text-gray-300">
                    Full Name
                  </span>
                </label>

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  className="input input-bordered w-full bg-[#2d1a10] border-[#4d2d1c] text-white focus:border-[#d69b2d]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="label">
                  <span className="label-text text-gray-300">
                    Email Address
                  </span>
                </label>

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="input input-bordered w-full bg-[#2d1a10] border-[#4d2d1c] text-white focus:border-[#d69b2d]"
                />
              </div>

              {/* Photo URL */}
              <div>
                <label className="label">
                  <span className="label-text text-gray-300">
                    Photo URL
                  </span>
                </label>

                <input
                  type="text"
                  name="image"
                  required
                  placeholder="https://example.com/photo.jpg"
                  className="input input-bordered w-full bg-[#2d1a10] border-[#4d2d1c] text-white focus:border-[#d69b2d]"
                />
              </div>

              {/* Password */}
              <div>
                <label className="label">
                  <span className="label-text text-gray-300">
                    Password
                  </span>
                </label>

                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter password"
                  className="input input-bordered w-full bg-[#2d1a10] border-[#4d2d1c] text-white focus:border-[#d69b2d]"
                />

                {/* Password Rules */}
                <div className="mt-2 text-sm text-gray-400 space-y-1">
                  <p>• At least 6 characters</p>
                  <p>• At least one uppercase letter</p>
                  <p>• At least one lowercase letter</p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm rounded-xl px-4 py-3">
                  {error}
                </div>
              )}

              {/* Register Button */}
              <button className="btn w-full bg-[#d69b2d] border-none hover:bg-[#ebb042] text-black text-lg rounded-xl">
                Register
              </button>

              {/* Divider */}
              <div className="divider text-gray-500">OR</div>

              {/* Google Button */}
              <button
              onClick={handleGoogleSignin}
                type="button"
                className="btn w-full bg-white text-black hover:bg-gray-100 border-none rounded-xl"
              >
                Continue with Google
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-400 mt-8">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#d69b2d] hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;