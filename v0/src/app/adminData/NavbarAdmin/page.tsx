"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there's a token in cookies

    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    setIsAuthenticated(!!token); // Set authentication state based on token presence
  }, []);

  return (
    <nav className="bg-teal-900 flex justify-between">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/adminData/RegisterAdmin">Admin Register</Link>
        <Link href="/adminData/LoginAdmin">Admin Login</Link>
        <Link href="/adminData/ProfileAdmin">Admin Profile</Link>
        {isAuthenticated ? (
          <Link href="../../api/auth/logout">Logout</Link>
        ) : null}
      </div>
    </nav>
  );
}
