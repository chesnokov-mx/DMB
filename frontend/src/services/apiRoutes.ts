import { appConfig } from "@/config/appConfig.ts";

import { HttpClient } from "@/services/api";

import { USER_ID, USER_TOKEN_KEY, USER_TOKEN_KEY_REFRESH } from "@/constants";

export const httpService = new HttpClient(appConfig.API_URL);

const requests = {
  auth: async (phone: number) => {
    const result = await httpService.post<any>({
      endpoint: "/api/v3/login",
      data: { phone, resend: true },
    });
    setAccessToken(result.data);
    return { result };
  },

  sendCode: async (code: string) => {
    const token = getAccessToken();
    const result = await httpService.post<any>({
      endpoint: "/api/v3/manage/sms/validate",
      data: { code, token },
    });
    setAccessToken(result.access.token);
    setRefreshToken(result.refresh.token);
    setUserId(result.user_id);
    return { result };
  },
};

export default {
  requests,
  logout() {
    localStorage.clear();
    window.location.href = "/";
  },
};

export function getAccessToken(): string {
  return localStorage.getItem(USER_TOKEN_KEY) || "";
}

export function getRefreshToken(): string {
  return localStorage.getItem(USER_TOKEN_KEY_REFRESH) || "";
}

export function setAccessToken(token: string) {
  localStorage.setItem(USER_TOKEN_KEY, token);
}

export function setRefreshToken(token: string) {
  localStorage.setItem(USER_TOKEN_KEY_REFRESH, token);
}

export function setUserId(userId: number) {
  localStorage.setItem(USER_ID, JSON.stringify(userId));
}
