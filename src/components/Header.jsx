import React from "react";

const Header = ({ category }) => (
  <div className="mb-10">
    <p className="text-lg text-gray-400">{category}</p>
    <p className="text-3xl font-extrabold tracking-tight text-slate-900">
      Reactify Admin
    </p>
  </div>
);

export default Header;
