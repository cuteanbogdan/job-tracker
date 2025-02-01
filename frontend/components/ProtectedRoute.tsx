"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading, checkingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!checkingAuth && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, checkingAuth, router]);

  if (checkingAuth || loading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
