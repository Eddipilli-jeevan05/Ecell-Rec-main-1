"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { EventsCard } from "../EventsCard";

export default function page() {
  return (
    <div className="h-full relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
      <Boxes />
      <div className="h-screen flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-wide z-20">
          Events
        </h1>
        <p className="mt-4 text-white text-lg md:text-xl lg:text-2xl relative z-20">
          Explore all the events here!
        </p>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full relative z-20">
        <EventsCard />
      </div>
    </div>
  );
}
