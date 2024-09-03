// src/layouts/RootLayout.tsx
import React from "react";
import AdminNavBar from "../component/AdminNavBar";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  return (
    <div>
      <AdminNavBar />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
