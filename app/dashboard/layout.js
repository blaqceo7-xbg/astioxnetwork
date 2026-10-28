"use client"

import "./../globals.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthProvider, useAuth } from "./../context/AuthContext";
import LoadingScreen from "../loading";
import axios from "axios";

function DashboardGuard({ children }) {
  const router = useRouter();
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        
        const res = await axios.get(
                `/api/auth/users`,
                {
                  withCredentials: true,
                  headers: { "Content-Type": "application/json" },
                }
              );

              if (res.status === 200 && res.data.user.role === "user") {
                    setUser(res.data.user);
                    setLoading(false);
                }

                if (res.status === 200 && res.data.user.role === "admin") {
                    router.push("/admin-panel");
                }
      } catch (err) {
        router.replace("/login");
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return <LoadingScreen />
  }

  return children;
}

export default function DashboardLayout({ children }) {
  return (
    <div lang="en" suppressHydrationWarning>
      <div
        suppressHydrationWarning
        className={`bg-white w-full h-full text-black min-h-screen antialiased`}
      >
        <AuthProvider>
            <DashboardGuard>{children}</DashboardGuard>
        </AuthProvider>
      </div>
    </div>
  );
}
