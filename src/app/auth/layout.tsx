import React from "react";
import { AuthHeader } from ".";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#FAFAFA] flex flex-col min-h-screen items-center justify-center w-full gap-[51px]">
      <AuthHeader />
      {children}
    </main>
  );
}
