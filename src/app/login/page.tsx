'use client'
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";



const LoginPage = () => {
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signIn.email({
      email: user.email as string,
      password: user.password as string,
    });
console.log(data, "Data")
console.log(error, "error")

    if (data) {
      toast.success("Login successful")
      redirect('/')
    }

    if (error) {
      // toast
      toast.error(error.message);
    }
  };

  const handleGoogleSignin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen my-10 bg-[#120804] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-[#1b0d06] rounded-3xl overflow-hidden shadow-2xl border border-[#3b2415]">
        
        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center p-14 bg-gradient-to-br from-[#1a0c05] to-[#120804]">
          <div className="flex items-center  mb-10">
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
            Welcome <br />
            Back to Your <br />
            <span className="italic text-[#d69b2d] font-serif">
              Focus Zone
            </span>
          </h2>

          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            Book elegant study rooms, meeting spaces, and private
            productivity environments designed to help you focus deeply.
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
              <h2 className="text-4xl font-bold mb-2">Login</h2>
              <p className="text-gray-400">
                Continue your productivity journey.
              </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5">
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
                  placeholder="you@example.com"
                  className="input input-bordered w-full bg-[#2d1a10] border-[#4d2d1c] text-white focus:outline-none focus:border-[#d69b2d]"
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
                  placeholder="••••••••"
                  className="input input-bordered w-full bg-[#2d1a10] border-[#4d2d1c] text-white focus:outline-none focus:border-[#d69b2d]"
                />
              </div>

              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                  
                    type="checkbox"
                    className="checkbox checkbox-warning checkbox-sm"
                  />
                  <span className="text-gray-300">Remember me</span>
                </label>

                <p
                  
                  className="text-[#d69b2d] hover:underline"
                >
                  Forgot password?
                </p>
              </div>

              {/* Login Button */}
              <button className="btn w-full bg-[#d69b2d] border-none hover:bg-[#ebb042] text-black text-lg rounded-xl mt-2">
                Login
              </button>

              {/* Divider */}
              <div className="divider text-gray-500">OR</div>

              {/* Google Login */}
              <button
              onClick={handleGoogleSignin}
                type="button"
                className="btn w-full bg-white text-black hover:bg-gray-100 rounded-xl border-none"
              >
                Continue with Google
              </button>
            </form>

            {/* Register */}
            <p className="text-center text-gray-400 mt-8">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-[#d69b2d] hover:underline font-medium"
              >
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;