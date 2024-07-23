"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui";
import AppContextProvider from "./appcontext";


const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppContextProvider>
      <SessionProvider>
        {children}
        <Toaster />
      </SessionProvider>
    </AppContextProvider>
  );
};

export { Providers };
