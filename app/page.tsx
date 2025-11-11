"use client";
// import { authClient } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function LoggedIn() {
  const [users, setUsers] = useState<[{ name?: string; email?: string }]>([{}]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  console.log(users);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const session = await authClient.getSession();
  //     if (session?.data?.user) {
  //       setUser({
  //         email: session?.data.user.email,
  //         name: session?.data.user.name,
  //       });
  //     }
  //   };
  //   fetchUser();

  //   console.log(fetchUsernames.name);
  // }, []);
  return (
    // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    //   {/* <h1 className="text-3xl font-bold">Halo, {user?.name} 👋</h1>
    //   <p className="text-gray-600 mt-2">Email kamu: {user!.email}</p> */}
    //   <h1>Hai</h1>
    // </div>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Daftar User</h1>
      <ul>
        {users.map((u, i) => (
          <li key={i} className="text-gray-700">
            {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
