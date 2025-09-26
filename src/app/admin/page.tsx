"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

export default function AdminPanel() {
  const { isAuthenticated, logout, isLoading } = useAdminAuth();
  const router = useRouter();
  
  // Redirect to new admin panel
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push("/admin/perfumes");
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/admin/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-accent mx-auto mb-3 sm:mb-4"></div>
          <p className="text-sm sm:text-base">Зареждане...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // Show redirecting message
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-accent mx-auto mb-3 sm:mb-4"></div>
        <p className="text-sm sm:text-base">Пренасочване към новия админ панел...</p>
      </div>
    </div>
  );
}