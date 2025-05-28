import axiosInstance from "@/api";
import { LoginRequest, LoginResponse, RegisterRequest } from "@/api/auth/types";

export async function login(body: LoginRequest) {
  const { data } = await axiosInstance.post<LoginResponse>("login/", {
    ...body,
  });
  return data;
}

export async function register(body: RegisterRequest) {
  const { data } = await axiosInstance.post("users/", {
    ...body,
  });
  return data;
}
