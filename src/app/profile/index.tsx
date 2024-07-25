"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Button, useToast } from "@/components/ui";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getLinks, getUserbyId } from "../action";
import { Links, User } from "@prisma/client";
import { Plus, Menu, ArrowRight, Link as LinkIcon } from "lucide-react";
import {
  FaGithub,
  FaFacebook,
  FaLinkedin,
  FaInstagramSquare,
  FaYoutubeSquare,
  FaTwitter,
  FaDribbble,
  FaLinkedinIn,
  FaYoutube,
  FaGitlab,
  FaTwitch,
  FaCodepen,
  FaFreeCodeCamp,
  FaStackOverflow,
} from "react-icons/fa";
import { BiLogoDevTo } from "react-icons/bi";
import { FaXTwitter, FaHashnode } from "react-icons/fa6";
import { SiFrontendmentor, SiCodewars } from "react-icons/si";
import { cn } from "@/utils";

const ProfileHeader = () => {
  const { data: user } = useSession();
  const { toast } = useToast();
  const params = useSearchParams();
  const id = params.get("id");
  const [loading, startTranstion] = useTransition();

  const url = `https://devlink-2024.vercel.app/profile?id=${
    user?.user ? user.user.id : id
  }`;

  return (
    <header className="flex flex-col self-stretch px-6 pt-6 pb-20 w-full text-base font-semibold md:bg-violet-600 rounded-none max-md:px-5 max-md:max-w-full">
      <nav className="pl-[24px] p-[16px] w-full flex items-center justify-between bg-white md:rounded-xl">
        {user && (
          <Button asChild variant="secondary">
            <Link href="/dashboard">Back to Editor</Link>
          </Button>
        )}

        <Button
          onClick={async () => {
            await navigator.clipboard.writeText(url).then(() => {
              toast({
                title: "Link Copied!",
                description:
                  "The link has been successfully copied to your clipboard.",
              });
            });
          }}
        >
          Share Link
        </Button>
      </nav>
    </header>
  );
};

const PhoneScreen = () => {
  const [userSession, setUser] = useState<User>();
  const { data: sesion } = useSession();
  const params = useSearchParams();
  const id = params.get("id");
  const [loading, startTranstion] = useTransition();
  const [links, setLinks] = useState<Links[]>([]);
  const user_id = id || sesion?.user.id;

  useEffect(() => {
    startTranstion(() => {
      getLinks(user_id!).then((data) => {
        setLinks(data?.links ?? []);
      });
    });
  }, [user_id]);
  useEffect(() => {
    if (sesion) {
      setUser(sesion.user as User);
      return;
    }
    startTranstion(() => {
      getUserbyId(user_id!).then((user) => {
        // @ts-ignore
        setUser(user.user);
      });
    });
  }, [sesion, user_id]);
  return (
    <div className="bg-white md:w-[560px] md:h-[830px] flex items-center justify-center">
      <div className="phone">
        <div className="phone-screen">
          <div className="top">
            <div className="speaker" />
          </div>
          <div className="flex-col flex items-center justify-center w-full pt-[50px] p-[10px] gap-[56px]">
            <div className="flex flex-col items-center justify-center w-full gap-[24px]">
              <Image
                src={
                  userSession?.image
                    ? userSession.image
                    : `https://ui-avatars.com/api/?name=${userSession?.email}&background=random`
                }
                alt={userSession?.name ?? "user"}
                width={100}
                height={100}
                className="object-cover rounded-full border border-blue-600 h-[100px]"
              />
              <div className="flex flex-col gap-2 w-full items-center justify-center">
                <h2 className="text-lg font-semibold">{userSession?.name}</h2>
                <span className="text-[#737373] text-sm">
                  {userSession?.email}
                </span>
              </div>
            </div>
            {links.length > 0 ? (
              <div className="flex items-center justify-center w-full flex-col gap-5">
                {links.map((li) => (
                  <Link
                    href={li.link}
                    key={li.id}
                    className={cn(
                      "flex w-full h-[44px] rounded-md px-2 items-center justify-between",
                      li.platform.toLowerCase() === "github"
                        ? "bg-black text-white"
                        : li.platform.toLowerCase() === "youtube"
                        ? "bg-[#EE3939] text-white"
                        : li.platform.toLowerCase() === "twitter"
                        ? "bg-[#1DA1F2] text-white"
                        : li.platform.toLowerCase() === "linkedin"
                        ? "bg-[#2D68FF] text-white"
                        : li.platform.toLowerCase() === "dribbble"
                        ? "bg-[#ea4c89] text-white"
                        : li.platform.toLowerCase() === "facebook"
                        ? "bg-[#2442AC] text-white"
                        : li.platform.toLowerCase() === "instagram"
                        ? "bg-gradient-to-r from-pink-500 to-yellow-500 text-white"
                        : li.platform.toLowerCase() === "gitlab"
                        ? "bg-[#FC6D26] text-white"
                        : li.platform.toLowerCase() === "frontend mentor"
                        ? "bg-[#333333] text-white"
                        : li.platform.toLowerCase() === "twitch"
                        ? "bg-[#9146FF] text-white"
                        : li.platform.toLowerCase() === "dev.to"
                        ? "bg-[#0A0A0A] text-white"
                        : li.platform.toLowerCase() === "codewars"
                        ? "bg-[#AD2C27] text-white"
                        : li.platform.toLowerCase() === "codepen"
                        ? "bg-[#000000] text-white"
                        : li.platform.toLowerCase() === "freecodecamp"
                        ? "bg-[#006400] text-white"
                        : li.platform.toLowerCase() === "hashnode"
                        ? "bg-[#2962FF] text-white"
                        : li.platform.toLowerCase() === "stack overflow"
                        ? "bg-[#F48024] text-white"
                        : "bg-gray-200 text-black"
                    )}
                  >
                    <div className="flex gap-2 items-center">
                      {li.platform.toLowerCase() === "github" ? (
                        <FaGithub />
                      ) : li.platform.toLowerCase() === "youtube" ? (
                        <FaYoutube />
                      ) : li.platform.toLowerCase() === "twitter" ? (
                        <FaXTwitter />
                      ) : li.platform.toLowerCase() === "linkedin" ? (
                        <FaLinkedin />
                      ) : li.platform.toLowerCase() === "dribbble" ? (
                        <FaDribbble />
                      ) : li.platform.toLowerCase() === "facebook" ? (
                        <FaFacebook />
                      ) : li.platform.toLowerCase() === "instagram" ? (
                        <FaInstagramSquare />
                      ) : li.platform.toLowerCase() === "gitlab" ? (
                        <FaGitlab />
                      ) : li.platform.toLowerCase() === "frontend mentor" ? (
                        <SiFrontendmentor />
                      ) : li.platform.toLowerCase() === "twitch" ? (
                        <FaTwitch />
                      ) : li.platform.toLowerCase() === "dev.to" ? (
                        <BiLogoDevTo />
                      ) : li.platform.toLowerCase() === "codewars" ? (
                        <SiCodewars />
                      ) : li.platform.toLowerCase() === "codepen" ? (
                        <FaCodepen />
                      ) : li.platform.toLowerCase() === "freecodecamp" ? (
                        <FaFreeCodeCamp />
                      ) : li.platform.toLowerCase() === "hashnode" ? (
                        <FaHashnode />
                      ) : li.platform.toLowerCase() === "stack overflow" ? (
                        <FaStackOverflow />
                      ) : (
                        <LinkIcon />
                      )}
                      <span>{li.platform}</span>
                    </div>
                    <Button
                      asChild
                      variant="link"
                      className="text-white text-sm"
                    >
                      <Link href={li.link} target="_blank">
                        <ArrowRight size={14} />
                      </Link>
                    </Button>
                  </Link>
                ))}
              </div>
            ) : (
              <p>this users profile is blank</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProfileHeader, PhoneScreen };
