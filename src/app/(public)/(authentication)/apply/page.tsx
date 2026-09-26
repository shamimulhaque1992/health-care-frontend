import DoctorApplyForm from "@/components/forms/doctor-apply-form";
import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ApplyPage() {
  return (
    <div className="grid h-svh lg:grid-cols-[1fr_0.6fr]">
      {/* Left — form panel */}
      <div className="flex flex-col h-full px-8 py-8 md:px-16 overflow-y-auto">
        <Link href="/" className="flex items-center gap-2 font-semibold text-primary shrink-0">
          <div className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          MedConnect
        </Link>
        <div className="flex flex-1 items-center justify-center py-8">
          <DoctorApplyForm />
        </div>
        <p className="text-center text-xs text-muted-foreground shrink-0">
          © {new Date().getFullYear()} MedConnect. All rights reserved.
        </p>
      </div>
      {/* Right — image panel */}
      <div className="relative hidden lg:block">
        <Image
          fill
          src="/medconnect_apply_doctor.png"
          alt="Apply as doctor visual"
          className="object-cover object-top dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-10 left-8 right-8 text-white">
          <p className="text-2xl font-semibold leading-snug">
            Make a difference in people&apos;s lives.
          </p>
          <p className="mt-2 text-sm text-white/70">
            Join our network of trusted doctors and reach patients who need you.
          </p>
        </div>
      </div>
    </div>
  );
}
