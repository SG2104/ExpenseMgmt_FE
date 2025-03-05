"use client";
import Logo from "./logo";
import NavMenu from "@/components/ui/navigationDropdown";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Navbar= () => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-row items-center justify-between p-4">
        <Logo />
        <NavMenu className="sticky top-0 z-50" />
        <div className="flex items-center gap-4">
          <Button onClick={() => router.push("/sign-in")}>Login</Button>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
};
export default Navbar;
