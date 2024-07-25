import { Button } from "@/components/ui";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const HeroSection: React.FC = () => {
  return (
    <section className="flex overflow-hidden relative flex-col items-center p-20 w-full min-h-[1024px] max-md:px-5 max-md:max-w-full">
      <Image
        src="/back.png"
        alt="hero-image"
        fill
        className="object-cover absolute inset-0 size-full"
      />
      <h1 className="relative mt-40 text-7xl font-bold tracking-wider text-center w-[676px] max-md:mt-10 max-md:max-w-full max-md:text-4xl">
        Welcome To DEVLINK
      </h1>
      <p className="relative mt-8 text-2xl leading-8 text-center w-[632px] max-md:max-w-full">
        Simplify your online presence with a single link that consolidates all
        your social profiles and personal information.
      </p>
      <Button className="relative mt-8 mb-52 max-md:mb-10" asChild>
        <Link href="/auth/login">Get started</Link>
      </Button>
    </section>
  );
};

export default HeroSection;
