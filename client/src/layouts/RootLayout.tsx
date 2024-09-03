// src/layouts/RootLayout.tsx
import React from "react";
import NavBar from "../component/NavBar";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <div>
      <NavBar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
