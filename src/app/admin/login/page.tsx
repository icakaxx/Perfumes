"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Lock, User, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const success = await login(username, password);
      if (success) {
        router.push("/admin");
      } else {
        setError("Невалидни данни за вход");
      }
    } catch (error) {
      setError("Възникна грешка при влизане. Моля, опитайте отново.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-3 sm:p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center p-4 sm:p-6">
          <div className="mx-auto w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <Lock className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold">Админ Панел</CardTitle>
          <p className="text-sm sm:text-base text-gray-600">Влезте в административния панел</p>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm sm:text-base">Потребителско име</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Въведете потребителско име"
                  className="pl-10 text-sm sm:text-base h-10 sm:h-11"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">Парола</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Въведете парола"
                  className="pl-10 text-sm sm:text-base h-10 sm:h-11"
                  required
                />
              </div>
            </div>
            
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-xs sm:text-sm">
                <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full bg-accent hover:bg-accent/90 text-white text-sm sm:text-base h-10 sm:h-11"
              disabled={isLoading}
            >
              {isLoading ? "Влизане..." : "Влез"}
            </Button>
          </form>
          
          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              Конфигурирайте ADMIN_USERNAME и ADMIN_PASSWORD в .env файла
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

