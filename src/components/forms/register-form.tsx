"use client";

import { useForm } from "@tanstack/react-form";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "../ui/field";
import { loginZodSchema, patientRegistrationSchema } from "@/validations";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { toast } from "../ui/toast";
import { Spinner } from "@/components/ui/spinner";
import GoogleLoginComponent from "../modules/google-login/GoogleLoginComponent";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const { mutate: userLogin, isPending: isLoginPending } = useLogin();
  const form = useForm({
    defaultValues: {
      name: "shamim",
      email: "superadmin@gmail.com",
      contactNumber: "01779312970",
      password: "superadmin123aA@",
      confirmPassword: "superadmin123aA@",
    },
    onSubmit: ({ value }) => {
      const loginData = {
        name: value.name,
        email: value.email,
        patient: {
          contactNumber: value.contactNumber,
        },
        password: value.password,
      };
      userLogin(loginData, {
        onSuccess: (res) => {
          toast.add({
            title: "Login Successful",
            description: "You have been logged in successfully.",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Login Failed",
            description: "Invalid email or password.",
            type: "error",
          });
        },
      });
    },
    validators: {
      onSubmit: patientRegistrationSchema,
    },
  });

  return (
    <div className="w-full max-w-md flex flex-col gap-6 rounded-lg border bg-background p-6 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <p className="text-sm font-medium text-primary uppercase tracking-widest mb-2">
          Welcome back
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Sign in to your account
        </h1>
        <p className="mt-2 text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-medium hover:underline underline-offset-4"
          >
            Create one
          </Link>
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="name">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-medium"
                  >
                    Full name
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="Khandoker shamimul haque"
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className="h-11 text-base"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-medium"
                  >
                    Email address
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="you@example.com"
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className="h-11 text-base"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="contactNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel
                    htmlFor={field.name}
                    className="text-sm font-medium"
                  >
                    Email address
                  </FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="+008 1779312970"
                    onChange={(e) => field.handleChange(e.target.value)}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    autoComplete="off"
                    aria-invalid={isInvalid}
                    className="h-11 text-base"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-medium"
                    >
                      Password
                    </FieldLabel>
                    <Link
                      href="#"
                      className="text-xs text-primary hover:underline underline-offset-4"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      onChange={(e) => field.handleChange(e.target.value)}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                      className="h-11 pr-10 text-base"
                    />
                    <Button
                      className="absolute right-1 top-0 bottom-0 my-auto text-muted-foreground hover:text-foreground"
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </Button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel
                      htmlFor={field.name}
                      className="text-sm font-medium"
                    >
                      Confirm password
                    </FieldLabel>
                  </div>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      onChange={(e) => field.handleChange(e.target.value)}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      autoComplete="off"
                      aria-invalid={isInvalid}
                      className="h-11 pr-10 text-base"
                    />
                    <Button
                      className="absolute right-1 top-0 bottom-0 my-auto text-muted-foreground hover:text-foreground"
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </Button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>
          <Button
            disabled={isLoginPending}
            type="submit"
            className="mt-2 h-11 w-full text-base font-semibold"
          >
            {isLoginPending ? (
              <>
                <Spinner />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </FieldGroup>
      </form>
      <FieldSeparator>Or continue with</FieldSeparator>
      <GoogleLoginComponent />
    </div>
  );
};

export default RegisterForm;
