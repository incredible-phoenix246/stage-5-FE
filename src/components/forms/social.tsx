import { Button } from "@/components/ui";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export const GoogleSignIn = () => {
  const handleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };
  return (
    <form action={handleLogin}>
      <Button type="submit" variant="outline" className="w-full flex gap-2">
        <FcGoogle />
        <span>Continiue with Google</span>
      </Button>
    </form>
  );
};
