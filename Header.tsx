"use client";

import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("isLoggedIn");

    router.replace("/admin/login");
  };

  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        
        {/* LEFT SIDE : STORE NAME + DETAILS */}
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">
            Smart Devices • Best Prices • Fast Delivery
          </span>
          <span className="text-xs text-gray-500">
            Phones | Laptops | Accessories
          </span>
          <span className="text-xs text-gray-500">
            Trusted Tech Store Since 2023
          </span>

          <h1
            className="text-2xl font-bold text-black cursor-pointer"
            onClick={() => router.push("/")}
          >
            ElectroMart
          </h1>
        </div>

        {/* RIGHT SIDE : CART + LOGOUT */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <ShoppingCart className="h-5 w-5" />
          </Button>

          {isLoggedIn && (
            <Button
              onClick={handleLogout}
              className="bg-black text-white hover:bg-gray-800"
            >
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}