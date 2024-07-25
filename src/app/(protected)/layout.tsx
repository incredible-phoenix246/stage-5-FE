import React from "react";
import { AuthenticatedHeader } from "./authheader";
import { PhoneScreen } from ".";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="bg-[#FAFAFA] flex flex-col w-full gap-[51px] md:p-[24px]">
      <AuthenticatedHeader />
      <section className="flex gap-[24px]">
        <PhoneScreen />
        {children}
      </section>
    </main>
  );
}
