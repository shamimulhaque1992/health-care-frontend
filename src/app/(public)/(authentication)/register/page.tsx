import LoginForm from "@/components/forms/login-form";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="grid h-svh lg:grid-cols-[1fr_1.1fr]">
      {/* Left — form panel */}
      <div className="flex flex-col h-full px-8 py-8 md:px-16">
        <Link href="/" className="flex items-center gap-2 font-semibold text-primary">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          MedConnect
        </Link>
        <div className="flex flex-1 items-center justify-center">
          {/* <RegisterForm /> */}
        </div>
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} MedConnect. All rights reserved.
        </p>
      </div>
      {/* Right — image panel */}
      <div className="relative hidden lg:block">
        <Image
          fill
          src="/register.png"
          alt="Register visual"
          className="object-cover object-top dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-10 left-8 right-8 text-white">
          <p className="text-2xl font-semibold leading-snug">
            Your health, managed smarter.
          </p>
          <p className="mt-2 text-sm text-white/70">
            Connect with top doctors and manage your care — all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}
