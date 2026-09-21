import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useGoogleOAuth } from "@/hooks";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

const GoogleLoginComponent = () => {
  const { mutate: googleLogin, isPending: isGoogleLoginPending } =
    useGoogleOAuth();
  const router = useRouter();
  const handleGoogleLoginSuccess = (credentialResponse: CredentialResponse) => {
    const idToken = credentialResponse.credential;
    if (!idToken) {
      toast.add({
        title: "Google Login Failed",
        description: "Unable to login with Google. Please try again.",
        type: "error",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: () => {
          toast.add({
            title: "Google Login Successful",
            description: "You have been logged in successfully.",
            type: "success",
          });
          router.push("/");
        },
        onError: (err) => {
          toast.add({
            title: "Google Login Failed",
            description:
              err.message || "Unable to login with Google. Please try again.",
            type: "error",
          });
        },
      },
    );
  };
  const handleGoogleLoginError = () => {
    toast.add({
      title: "Google Login Failed",
      description: "Unable to login with Google. Please try again.",
      type: "error",
    });
  };
  return (
    <GoogleLogin
      theme="outline"
      shape="rectangular"
      size="large"
      width="100%"
      text="continue_with"
      type="standard"
      onSuccess={handleGoogleLoginSuccess}
      onError={handleGoogleLoginError}
    />
  );
};

export default GoogleLoginComponent;
