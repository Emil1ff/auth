"use client";

import Image from 'next/image';
import { useState } from 'react';
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import logo from '../../../../public/logo.png';

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg)] p-5">
      <div className=" rounded-t-4xl flex items-center justify-center h-[170px] w-[250px]">
        <Image src={logo} alt="Logo" width={180} height={101} />
      </div>

      <div className="card bg-gray-200 rounded-[20px] w-[475px] h-[375px] p-6 shadow-md">
        <div className="card-body w-full">
          <h5 className="text-black font-medium text-center mb-5 text-lg mt-3">
          Respublika Diaqnostika Mərkəzi
        </h5>

        <form action="POST" className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="text-[15px] block mb-1">
              İstifadəçi adı və ya e-poçt ünvanı
            </label>
            <input
              id="username"
              type="text"
              name="email"
              placeholder="İstifadəçi adı və ya e-poçt ünvanı"
              className="text-[15px] w-full bg-[var(--palceholder)] h-10 p-3 rounded-[8px] outline-none"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-[15px] block mb-1">
              Şifrə
            </label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Şifrə"
              className="text-[15px] w-full bg-[var(--palceholder)] h-10 p-3 pr-10 rounded-[8px] outline-none"
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              {showPassword ? (
                <IoMdEye className="h-5 w-5" />
              ) : (
                <IoMdEyeOff className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="mb-5 flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded cursor-pointer"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-700 cursor-pointer">
              Yadda Saxla
            </label>
          </div>

          <div className=" flex justify-end">
            <button type='submit' className='w-[180px] h-[36px] bg-[var(--buttonbg)] text-white cursor-pointer rounded-xs text-[15px] hover:bg-[var(--buttonbghover)] transition duration-200"'>Daxil olun</button>
          </div>
        </form>
        </div>
      </div>
      <footer className='absolute bottom-4'>
        <p className='text-white text-[15px]'>© 2025 Respublika Diaqnostika Mərkəzi. Bütün hüquqlar qorunur.</p>
      </footer>
    </div>
  );
};

export default Page;
