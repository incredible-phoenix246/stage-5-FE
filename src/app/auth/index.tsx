"use client";
import Image from "next/image";

const AuthHeader = () => (
  <div className="flex items-center justify-center gap-2">
    <Image src="/logo.png" alt="Logo" width={40} height={40} />
    <h1 className="text-4xl font-bold">devlinks</h1>
  </div>
);

export { AuthHeader };
