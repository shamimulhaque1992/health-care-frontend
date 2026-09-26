"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "../ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { toast } from "../ui/toast";
import { useVerifyAccount } from "@/hooks";
import { Spinner } from "../ui/spinner";

const RESEND_SECONDS = 60;

const VerifyAccountForm = () => {
  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_SECONDS);

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const { mutate: verifyAccount, isPending } = useVerifyAccount();

  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };

    verifyAccount(verifyData, {
      onSuccess: () => {
        toast.add({
          title: "Email Verified",
          description: "Your account has been verified successfully.",
          type: "success",
        });
        router.push("/");
      },
      onError: () => {
        setIsInvalid(true);
        toast.add({
          title: "Verification Failed",
          description: "Invalid OTP. Please try again.",
          type: "error",
        });
      },
    });
  };

  const handleResend = () => {
    setResendTimer(RESEND_SECONDS);
    setOtp("");
    setIsInvalid(false);
    toast.add({
      title: "OTP Resent",
      description: "A new OTP has been sent to your email.",
      type: "success",
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verify Account</CardTitle>
        <CardDescription>
          Please provide the OTP we sent to{" "}
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="otp-form"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP();
          }}
        >
          <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP
              maxLength={6}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) setIsInvalid(false);
              }}
              value={otp}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {isInvalid && (
              <FieldError
                errors={[{ message: "Invalid Code. Please try again" }]}
              />
            )}
            <FieldDescription>
              {resendTimer > 0
                ? `Resend in ${resendTimer}s`
                : "You can resend now"}
            </FieldDescription>
          </Field>
        </form>
      </CardContent>
      <CardFooter className="gap-2">
        <Button
          variant="outline"
          disabled={resendTimer > 0}
          onClick={handleResend}
        >
          Resend
        </Button>
        <Button type="submit" form="otp-form" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner /> Verifying...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyAccountForm;
