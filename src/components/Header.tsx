import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="w-full wrapper bg-[var(--green-color)]  border-[3px] rounded-bl-lg rounded-br-lg">
      <div>
        <Link to="/">
          <h1 className="font-bold text-[var(--white-color)]">Product Shop</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
