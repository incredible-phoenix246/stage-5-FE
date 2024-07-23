"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";

// Add Your Props here
interface AppContextProps {
  showMobileMenu: boolean;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  ShowOtp: boolean;
  setShowOtp: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext({} as AppContextProps);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Add Your State(s) Here
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [ShowOtp, setShowOtp] = React.useState(false);

  const isAnyModalOpen = ShowOtp || showMobileMenu;

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowMobileMenu(false);
        setShowOtp(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAnyModalOpen]);

  useEffect(() => {
    const t = "%c  Made By \ud83d\udc9a  - Phoenix ",
      n = [
        "font-size: 12px",
        "color: #fffce1",
        "font-family: monospace",
        "background: #0e100f",
        "display: inline-block",
        "padding: 1rem 3rem",
        "border: 1px solid #0ff",
        "border-radius: 4px;",
      ].join(";");
    console.log(t, n);
  }, []);

  const value = useMemo(
    () => ({ showMobileMenu, setShowMobileMenu, setShowOtp, ShowOtp }),
    [showMobileMenu, ShowOtp]
  );

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

// Call this function whenever you want to use the context
export const useAppCtx = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useAppCtx must be used within a AppContextProvider");
  }
  return ctx;
};

export default AppContextProvider;
