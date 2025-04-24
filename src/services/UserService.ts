import apiClient from "../config/axiosConfig";
import { TokenResponse } from "../types/TokenResponse";
import { LoginRequest } from "../types/LoginRequest";

export const loginUserApi = async (
  loginRequest: LoginRequest,
): Promise<TokenResponse> => {
  return apiClient.post("/auth/login", loginRequest).then((res) => res.data);
};
