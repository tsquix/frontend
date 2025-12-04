import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex w-full bg-gray-100 p-6 shadow-2xl gap-12 text-lg">
      <div className="hover:opacity-70">
        <Link href={"/"}>Home</Link>
      </div>
      <div className="hover:opacity-70">
        <Link href={"/energy-mix"}>Show energy mix</Link>
      </div>
      <div className="hover:opacity-70">
        <Link href={"/optimal-charge-range"}>Show optimal charge range</Link>
      </div>
    </div>
  );
};

export default Header;
