"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useGetMyProfile, useLogout } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React from "react";

const Header = () => {
  const { data, isLoading } = useGetMyProfile();
  const { mutate } = useLogout();
  const queryClient = useQueryClient();
  const routes = [
    { name: "Home", url: "/" },
    { name: "About us", url: "/about-us" },
  ];

  const handleLogOut = () => {
    mutate(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logged out",
          description: "Logged out successfully!",
          type: "success",
        });

        queryClient.removeQueries({ queryKey: ["my-profile"] });
      },
      onError: (error) => {
        toast.add({
          title: "Something went wrong",
          description: "Failed to log out.",
          type: "error",
        });
      },
    });
  };

  return (
    <header className="w-full h-16 border border-b">
      <div className="flex justify-between items-center h-full max-w-7xl mx-auto">
        <div>MedConnect</div>
        <nav className="flex gap-5">
          {routes.map((route) => (
            <Link key={route.url} href={route.url}>
              {route.name}
            </Link>
          ))}
        </nav>
        <div>
          {!isLoading && !data && (
            <Button
              variant="outline"
              render={<Link href="/login">Login</Link>}
              nativeButton={false}
            >
              login
            </Button>
          )}
          {!isLoading && data && (
            <Button onClick={handleLogOut} variant="destructive">
              Logout
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
