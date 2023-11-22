import React from "react";
import Navbar from "../Blocks/Navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function FullScreenLayout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      <main className={"w-full mx-auto overflow-hidden"}>
        {children}
      </main>
    </div>
  );
}
