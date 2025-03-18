import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-white overflow-auto">
      <Header />
      <main className="flex-1 wrapper">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
