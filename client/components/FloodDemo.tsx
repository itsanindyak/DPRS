"use client";
import React from 'react'

const FloodDemo = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center gap-6 mt-10">
      <h1 className="text-3xl md:text-4xl font-bold text-[#ff8906] drop-shadow-lg text-center my-6">
        Flood Fighter 🌊
      </h1>

      <div className="flex justify-center w-full ">
        <iframe
          src="/unity/flood/index.html"
          className="max-w-6xl w-full h-[700px] border-4 border-[#ff8906] rounded-lg"
        ></iframe>
      </div>

      <p className="mt-6 text-gray-300 text-sm text-center">
        <span className="text-[#ff8906] font-semibold">fullscreen</span> for the
        best experience!
      </p>
    </div>
  );
}

export default FloodDemo