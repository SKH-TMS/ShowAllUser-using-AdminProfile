"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarAdmin from "../NavbarAdmin/page";

// Define User Type
interface User {
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
}

export default function AllUsers() {
  const [users, setUsers] = useState<User[]>([]); // Fix: Specify the array type explicitly
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("../../api/adminData/getAllUsers");
        const data = await response.json();

        if (data.success) {
          setUsers(data.users);
        } else {
          setError(data.message || "Failed to fetch users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users. Please try again later.");
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <NavbarAdmin />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Registered Users</h1>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Profile Pic</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} className="border-b">
                <td className="border px-4 py-2">
                  {user.firstName} {user.lastName}
                </td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">
                  <img
                    src={user.profilePic || "/default-profile.png"}
                    alt="Profile"
                    width={50}
                    height={50}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
