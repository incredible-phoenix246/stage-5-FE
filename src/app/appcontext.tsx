"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useTransition,
} from "react";
import { getAllLinks } from "./action";
import { Links } from "@prisma/client";

// Add Your Props here
interface AppContextProps {
  showMobileMenu: boolean;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
  showOtp: boolean;
  setShowOtp: React.Dispatch<React.SetStateAction<boolean>>;
  tabs: "link" | "profile";
  setTabs: React.Dispatch<React.SetStateAction<"link" | "profile">>;
  links: Links[];
  setLinks: React.Dispatch<React.SetStateAction<Links[]>>;
}

export const AppContext = createContext({} as AppContextProps);

const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
  // Add Your State(s) Here
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);
  const [showOtp, setShowOtp] = React.useState(false);
  const [tabs, setTabs] = React.useState<"link" | "profile">("link");
  const [links, setLinks] = React.useState<Links[]>([]);
  const [isLoading, startTransition] = useTransition();

  const isAnyModalOpen = showOtp || showMobileMenu;

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
    startTransition(() => {
      getAllLinks().then((data) => {
        setLinks(data?.links ?? []);
      });
    });
  }, []);

  useEffect(() => {
    const t = "%c  Made By \ud83d\udc9a  - Phoenix ";
    const n = [
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
    () => ({
      showMobileMenu,
      setShowMobileMenu,
      setShowOtp,
      showOtp,
      tabs,
      setTabs,
      links,
      setLinks,
    }),
    [showMobileMenu, showOtp, tabs, links]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppCtx = () => {
  const ctx = useContext(AppContext);

  if (!ctx) {
    throw new Error("useAppCtx must be used within an AppContextProvider");
  }
  return ctx;
};

export default AppContextProvider;
