import { getMyProfile, googleOAuth, logout, userLogin, userRegistration, verifyAccount } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};

export function useVerifyAccount() {
  return useMutation({
    mutationFn: verifyAccount,
  });
}

export function useRegistration() {
  return useMutation({
    mutationFn: userRegistration,
  });
}
export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
export const useGoogleOAuth = () => {
  return useMutation({
    mutationFn: googleOAuth,
  });
};
export const useGetMyProfile = () => {
  return useQuery({
    queryFn: getMyProfile,
    queryKey: ["my-profile"],
    retry: false,
  });
};
