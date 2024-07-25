"use client";

import React, { useState, DragEvent, useTransition, useEffect } from "react";
import { useAppCtx } from "../appcontext";
import { Button } from "@/components/ui";
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
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Input,
  SelectSeparator,
  useToast,
  Label,
} from "@/components/ui";
import { cn } from "@/utils";
import { CreateLink, CreateOrUpdateLink } from "../action";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { CiImageOn } from "react-icons/ci";
import { User } from "@prisma/client";
import { updateUser } from "../action/auth";

type CloudinaryAsset = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  folder: string;
  original_filename: string;
};

const PhoneScreen = () => {
  const { links } = useAppCtx();
  const { data: userSession } = useSession();
  return (
    <div className="bg-white w-[560px] h-[830px] hidden lg:flex items-center justify-center">
      <div className="phone">
        <div className="phone-screen">
          <div className="top">
            <div className="speaker" />
          </div>
          <div className="flex-col flex items-center justify-center w-full pt-[50px] p-[10px] gap-[56px]">
            <div className="flex flex-col items-center justify-center w-full gap-[24px]">
              <Image
                src={
                  userSession?.user.image
                    ? userSession.user.image
                    : `https://ui-avatars.com/api/?name=${userSession?.user.email}&background=random`
                }
                alt={userSession?.user.name ?? "user"}
                width={100}
                height={100}
                className="object-cover rounded-full border border-blue-600 h-[100px]"
              />
              <div className="flex flex-col gap-2 w-full items-center justify-center">
                <h2 className="text-lg font-semibold">
                  {userSession?.user.name}
                </h2>
                <span className="text-[#737373] text-sm">
                  {userSession?.user.email}
                </span>
              </div>
            </div>
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
                  <Button asChild variant="link" className="text-white text-sm">
                    <Link href={li.link} target="_blank">
                      <ArrowRight size={14} />
                    </Link>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = () => {
  const { data: userSession } = useSession();
  const [userData, setUserData] = useState<User>({} as User);
  const [image, setImage] = useState<File | Blob | null>(null);
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (userSession) {
      // @ts-ignore
      setUserData(userSession as User);
    }
  }, [userSession]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const maxSize = 5 * 1024 * 1024;

    if (file?.size! > maxSize) {
      toast({
        variant: "destructive",
        title: "File Too Large",
        description: "Please upload an image file smaller than 5MB",
      });
      e.target.value = "";
    }
    const acceptedMimeType = [
      "image/jpeg",
      "image/png",
      "image/svg+xml",
      "image/jpg",
    ];
    if (acceptedMimeType.includes(file?.type!)) {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    } else {
      toast({
        variant: "destructive",
        title: "Invalid File Type",
        description: "Please upload an image file",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    startTransition(async () => {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append(
          "upload_preset",
          process.env.NEXT_PUBLIC_UPLOAD_PRESET!
        );
        formData.append("api_key", process.env.NEXT_PUBLIC_API_KEY!);

        try {
          const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!response.ok) {
            throw new Error("Failed to upload image");
          }

          const data: CloudinaryAsset = await response.json();
          setUserData((prevData) => ({
            ...prevData,
            image: data.url,
          }));

          const updatedForm = {
            ...userData,
            image: data.url,
          };

          startTransition(() => {
            updateUser({
              // @ts-ignore
              name: updatedForm.name,
              email: updatedForm.email,
              image: updatedForm.image,
            }).then((data) => {
              if (data.success) {
                toast({
                  title: "Success",
                  description: "User data updated successfully",
                });
              } else {
                toast({
                  title: "Error",
                  description: data.error,
                });
              }
            });
          });
        } catch (error) {
          toast({
            variant: "destructive",
            title: "Error",
            description: " an error occurred",
          });
        }
      } else {
        console.log("Saving user data without new image:", userData);

        startTransition(() => {
          updateUser({
            // @ts-ignore
            name: userData.name,
            email: userData.email,
          }).then((data) => {
            if (data.success) {
              toast({
                title: "Success",
                description: "User data updated successfully",
              });
            } else {
              toast({
                title: "Error",
                description: data.error,
              });
            }
          });
        });
      }
    });
  };

  return (
    <div className="w-full bg-white p-[24px] md:p-[40px] relative">
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-2xl md:text-3xl font-bold">Profile Details</h2>
        <span className="text-[#737373] text-sm md:text-lg">
          Add your details to create a personal touch to your profile.
        </span>
      </div>
      <div className="bg-[#FAFAFA] md:mt-[40px] w-full flex flex-col h-[223px] md:flex-row p-[12px] md:p-[20px] items-center justify-between mt-5">
        <span className="text-[#737373] text-sm md:text-lg">
          Profile picture
        </span>
        <Label
          htmlFor="profileImage"
          className="flex flex-col justify-center items-center px-10 mx-auto text-base font-semibold leading-6 text-violet-600 bg-violet-100 rounded-xl h-[193px] w-[193px] max-md:px-5 max-md:mt-6"
        >
          <CiImageOn size={40} />
          <span className="mt-2">+ Upload Image</span>
          <Input
            className="sr-only"
            id="profileImage"
            accept="image/jpeg,image/png,image/svg+xml"
            onChange={handleImageChange}
          />
        </Label>
        <span className="text-[#737373] text-sm md:text-lg">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </span>
      </div>
      <div className="bg-[#FAFAFA] md:mt-[40px] w-full flex flex-col h-[223px] md:flex-row p-[12px] md:p-[20px] items-center justify-between mt-5">
        <div className="flex items-center flex-col md:flex-row justify-between w-full ">
          <Label className="">Name</Label>
          <Input
            placeholder="e.g. John"
            name="name"
            value={userData.name || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center flex-col md:flex-row justify-between w-full ">
          <Label className="">email</Label>
          <Input
            name="email"
            value={userData.email || ""}
            onChange={handleChange}
            placeholder="e.g. email@example.com"
          />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-[12px] md:p-[24px] md:px-[40] flex w-full items-center justify-end">
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

interface LinkProps {
  id?: number | string;
  link: string;
  platform: string;
}

interface CardType {
  id: number;
  link: string;
  platform: string;
  onChange: (id: number, updatedLink: Partial<CardType>) => void;
  onRemove: (id: number) => void;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  disabled: boolean;
}

function isValidUrl(url: string): boolean {
  const urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" + // domain name and extension
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) address
      "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+@]*)*" + // port and path, including special characters
      "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-zA-Z\\d_]*)?$", // fragment locator
    "i"
  );

  return !!urlPattern.test(url);
}

const LinkPage = () => {
  const { links, setLinks } = useAppCtx();
  const [newLinks, setNewLinks] = useState<LinkProps[]>([]);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  useEffect(() => {
    if (links) {
      setNewLinks(links.map((link) => ({ ...link })));
    }
  }, [links]);

  const handleCreateLinks = async () => {
    // Validate links before proceeding
    for (const link of newLinks) {
      if (!link.link || link.link.trim() === "") {
        toast({
          title: "Error",
          description: `The URL for the ${link.platform} platform is empty.`,
        });
        return;
      }

      if (!isValidUrl(link.link)) {
        toast({
          title: "Error",
          description: `The URL for the ${link.platform} platform is not valid.`,
        });
        return;
      }
    }

    startTransition(() => {
      // @ts-ignore
      CreateOrUpdateLink(newLinks).then((data) => {
        if (data.success) {
          // @ts-ignore
          setLinks(data.links);
        }
        toast({
          title: data.success ? "Successfully!" : "An error occurred",
          description: data.success
            ? "Links created successfully"
            : `${data.error}`,
        });
      });
    });
  };

  const currentLink = {
    link: "",
    platform: "",
  };

  const handleRemove = (id: number) => {
    setNewLinks((prevLinks) => prevLinks.filter((_, index) => index !== id));
  };

  const handleChange = (id: number, updatedLink: Partial<LinkProps>) => {
    setNewLinks((prevLinks) => {
      return prevLinks.map((link, index) =>
        index === id ? { ...link, ...updatedLink } : link
      );
    });
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, dropId: number) => {
    e.preventDefault();
    const dragId = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (dragId === dropId) return;

    const reorderedLinks = Array.from(newLinks);
    const [movedItem] = reorderedLinks.splice(dragId, 1);
    reorderedLinks.splice(dropId, 0, movedItem);

    setNewLinks(reorderedLinks);
  };

  return (
    <div className="w-full bg-white p-[24px] md:p-[40px] relative">
      <div className="flex flex-col gap-[8px]">
        <h2 className="text-2xl md:text-3xl font-bold">Customize your links</h2>
        <span className="text-[#737373] text-sm md:text-lg">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </span>
      </div>
      <div className="md:mt-[40px] mt-[20px] w-full flex flex-col gap-[24px]">
        <div className="flex w-full justify-end flex-col gap-2">
          <Button
            className="w-full flex items-center justify-center gap-3"
            variant="secondary"
            onClick={() => {
              setNewLinks((prevLinks) => [...prevLinks, currentLink]);
            }}
          >
            <Plus size={24} />
            Add new link
          </Button>
          <span className="text-xs text-end">scroll down to see new entry</span>
        </div>
        <div
          className={cn(
            "flex flex-col w-full  md:p-[20px] md:rounded-xl",
            links.length < 1 && newLinks.length < 1 && "md:bg-[#FAFAFA]"
          )}
        >
          {links.length < 1 && newLinks.length < 1 ? (
            <div className="flex flex-col gap-[20px] md:gap-[40px] md:py-[50px] items-center justify-center">
              <Image
                src="/emptystate.png"
                alt="emptystate.png"
                width={250}
                height={160}
              />
              <div className="flex flex-col gap-[24px] w-full md:w-[482px] text-center">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Let&apos;s get you started
                </h2>
                <span className="text-[#737373] text-sm md:text-lg">
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We&apos;re
                  here to help you share your profiles with everyone!
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-[20px] overflow-hidden overflow-y-auto h-[480px] hide-scroll">
              {newLinks.map((li, index) => (
                <LinkCard
                  // @ts-ignore
                  id={index}
                  platform={li.platform}
                  link={li.link}
                  key={index}
                  onChange={handleChange}
                  onRemove={handleRemove}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  disabled={isPending}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 p-[12px] md:p-[24px] md:px-[40] flex w-full items-center justify-end">
        <Button
          disabled={(links.length < 1 && newLinks.length < 1) || isPending}
          onClick={() => handleCreateLinks()}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

const DashBoardPage = () => {
  const { tabs } = useAppCtx();
  return tabs === "link" ? <LinkPage /> : <ProfilePage />;
};

const LinkCard = ({
  id,
  link,
  platform,
  onChange,
  onRemove,
  onDragStart,
  onDragOver,
  onDrop,
  disabled,
}: CardType) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange(id, { [name]: value });
  };
  const handleSelectChange = (value: string) => {
    onChange(id, { platform: value });
  };
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, id)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, id)}
      className="bg-[#FAFAFA] w-full rounded-lg md:rounded-2xl flex flex-col p-[12px] md:p-[20px]"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-center gap-1">
          <Menu size={12} />
          <span>link #{id + 1}</span>
        </div>
        <Button
          variant="ghost"
          onClick={() => onRemove(id)}
          disabled={disabled}
        >
          remove
        </Button>
      </div>
      <div className="flex flex-col w-full gap-2">
        <div className="flex flex-col w-full gap-1">
          <span className="text-[#737373] text-sm">Platform</span>
          <Select
            name="platform"
            value={platform}
            onValueChange={handleSelectChange}
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Platform" />
            </SelectTrigger>
            <SelectContent className="w-full">
              <SelectItem value="Github">
                <div className="flex items-center w-full gap-2 ">
                  <FaGithub />
                  <span>Github</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Facebook">
                <div className="flex items-center w-full gap-2 ">
                  <FaFacebook />
                  <span>Facebook</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Instagram">
                <div className="flex items-center w-full gap-2 ">
                  <FaInstagramSquare />
                  <span>Instagram</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Linkedin">
                <div className="flex items-center w-full gap-2 ">
                  <FaLinkedin />
                  <span>Linkedin</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Twitter">
                <div className="flex items-center w-full gap-2 ">
                  <FaTwitter />
                  <span> Twitter</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Youtube">
                <div className="flex items-center w-full gap-2 ">
                  <FaYoutubeSquare />
                  <span>Youtube</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Dribbble">
                <div className="flex items-center w-full gap-2 ">
                  <FaDribbble />
                  <span>Dribbble</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Gitlab">
                <div className="flex items-center w-full gap-2 ">
                  <FaGitlab />
                  <span>Gitlab</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Frontend Mentor">
                <div className="flex items-center w-full gap-2 ">
                  <SiFrontendmentor />
                  <span>Frontend Mentor</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Twitch">
                <div className="flex items-center w-full gap-2 ">
                  <FaTwitch />
                  <span>Twitch</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Dev.to">
                <div className="flex items-center w-full gap-2 ">
                  <BiLogoDevTo />
                  <span>Dev.to</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Codewars">
                <div className="flex items-center w-full gap-2 ">
                  <SiCodewars />
                  <span>Codewars</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Codepen">
                <div className="flex items-center w-full gap-2 ">
                  <FaCodepen />
                  <span>Codepen</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="freeCodeCamp">
                <div className="flex items-center w-full gap-2 ">
                  <FaFreeCodeCamp />
                  <span>freeCodeCamp</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Hashnode">
                <div className="flex items-center w-full gap-2 ">
                  <FaHashnode />
                  <span>Hashnode</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="Stack Overflow">
                <div className="flex items-center w-full gap-2 ">
                  <FaStackOverflow />
                  <span>Stack Overflow</span>
                </div>
              </SelectItem>
              <SelectSeparator />
              <SelectItem value="others">
                <div className="flex items-center w-full gap-2 ">
                  <LinkIcon size={12} />
                  <span>Others</span>
                </div>
              </SelectItem>
              <SelectSeparator />
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col w-full gap-1">
          <span className="text-sm text-[#737373]">Link</span>
          <Input
            className="w-full"
            type="url"
            name="link"
            value={link}
            onChange={handleInputChange}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export { PhoneScreen, DashBoardPage };
