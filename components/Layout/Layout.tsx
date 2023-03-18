import React from "react";
import Navbar from "../Blocks/Navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      <main className={"w-full max-w-[1504px] mx-auto overflow-hidden"}>
        {children}
      </main>
    </div>
  );
}
