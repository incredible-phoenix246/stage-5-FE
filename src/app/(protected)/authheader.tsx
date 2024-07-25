"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui";
import { Link as LinkIcon, CircleUser, Eye } from "lucide-react";
import { useAppCtx } from "../appcontext";
import { cn } from "@/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";

const AuthenticatedHeader = () => {
  const { setTabs, tabs } = useAppCtx();
  const { data: user } = useSession();
  return (
    <nav className="pl-[24px] p-[16px] w-full flex items-center justify-between bg-white md:rounded-xl">
      <Image
        src="/authlogin.png"
        alt="Logo"
        width={146}
        height={32}
        className="hidden md:inline"
      />
      <Image
        src="/mobilelogo.png"
        alt="Logo"
        width={35}
        height={35}
        className="md:hidden"
      />

      <div className="flex items-center justify-center gap-[16px]">
        <Button
          className={cn(
            "flex items-center gap-2 hover:bg-blue-100 hover:text-blue-600",
            tabs === "link" ? "bg-blue-100 text-blue-600" : " "
          )}
          variant="ghost"
          onClick={() => setTabs("link")}
        >
          <LinkIcon />
          <span className="hidden md:inline"> Links</span>
        </Button>
        <Button
          className={cn(
            "flex items-center gap-2 hover:bg-blue-100 hover:text-blue-600",
            tabs === "profile" ? "bg-blue-100 text-blue-600" : " "
          )}
          variant="ghost"
          onClick={() => setTabs("profile")}
        >
          <CircleUser />
          <span className="hidden md:inline">Profile</span>
        </Button>
      </div>
      <Button variant="secondary" className="flex items-center gap-2" asChild>
        <Link href={`/profile?id=${user?.user.id}`}>
          <Eye className="md:hidden" />
          <span className="hidden md:inline">Preview</span>
        </Link>
      </Button>
    </nav>
  );
};

export { AuthenticatedHeader };
