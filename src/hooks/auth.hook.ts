import { getMyProfile, logout, userLogin } from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: userLogin,
  });
};
export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};
export const useGetMyProfile = () => {
  return useQuery({
    queryFn: getMyProfile,
    queryKey: ["my-profile"],
    retry: false,
  });
};
