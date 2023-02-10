import React from "react";
import Navbar from "../Blocks/Navbar/Navbar";
import Sidebar from "../Blocks/Sidebar/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <main className="md:ml-60 bg-[#eeeeee]">{children}</main>
    </div>
  );
}
