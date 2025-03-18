import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#121212] text-white overflow-auto">
      <Header />
      <div className="flex-1 wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
