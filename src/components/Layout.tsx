import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col text-[var(--black-color)] overflow-auto">
      <Header />
      <main className="flex-1 wrapper">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
