"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavbarUser() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if there's a token in cookies

    const token = document.cookie
      .split(";")
      .find((cookie) => cookie.trim().startsWith("token="));
    setIsAuthenticated(!!token); // Set authentication state based on token presence
  }, []);

  return (
    <nav className="bg-blue-900 flex justify-between">
      <div>
        <Link href="/">Home</Link>
      </div>
      <div>
        <Link href="/userData/RegisterUser">Register</Link>
        <Link href="/userData/LoginUser">Login</Link>
        <Link href="/userData/ProfileUser">Profile</Link>
        {isAuthenticated ? (
          <Link href="../../api/auth/logout">Logout</Link>
        ) : null}
      </div>
    </nav>
  );
}
