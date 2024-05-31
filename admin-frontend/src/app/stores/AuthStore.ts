import { action, makeObservable, observable } from "mobx";

import api from "@/services/apiRoutes.ts";

import { USER_ADMIN } from "@/constants.ts";

export class AuthStore {
  @observable accessToken: string = "";
  @observable codeErr: string = "";

  @observable loading: boolean = false;

  @observable timeUntilCanSendNewCode: number = 0;

  @observable isAdmin: boolean = false;

  @observable token: string = "";
  @observable isAuth: boolean = false;
  @observable codeLength: number = 4;
  @observable loginErr: string = "";
  @observable fullPhoneNumber: string = "";

  @observable timerId: ReturnType<typeof setInterval> | undefined;

  constructor() {
    makeObservable(this);
    this.initAdmin();
  }

  @action
  private initAdmin() {
    const userAdmin = localStorage.getItem(USER_ADMIN);
    this.setIsAdmin(userAdmin !== null);
  }

  @action
  setUnAuth = () => {
    this.isAuth = false;
    this.accessToken = "";
    this.codeLength = 4;
    this.codeErr = "";
    localStorage.clear();
    window.location.href = "/";
  };

  @action
  setCodeErr = (error: string) => {
    this.codeErr = error;
  };

  @action
  setLoading = (val: boolean) => {
    this.loading = val;
  };

  @action
  setIsAdmin = (status: boolean) => {
    this.isAdmin = status;
  };

  @action
  setLoginErr = (error: string) => {
    this.loginErr = error;
  };

  @action
  tryAuth = async (phone = this.fullPhoneNumber) => {
    this.fullPhoneNumber = phone;
    this.setLoading(true);
    try {
      const response = await api.requests.auth(+phone);
      if (response) {
        this.codeLength = response.result?.code_length;
        this.isAuth = true;

        this.setTimer(60000);
      }
    } catch (error) {
      this.codeLength = 4;
      this.isAuth = false;
      this.loginErr =
        (error as any)?.response?.data?.error?.message ?? "Unknown error";
    } finally {
      this.setLoading(false);
    }
  };

  @action
  setTimer = (time: number) => {
    this.timeUntilCanSendNewCode = time / 1000;
    if (this.timerId) {
      clearInterval(this.timerId);
    }
    this.timerId = setInterval(() => --this.timeUntilCanSendNewCode, 1000);
    setTimeout(() => {
      clearInterval(this.timerId);
    }, time);
  };

  @action
  tryCode = async (code: string) => {
    this.setLoading(true);
    try {
      const response = await api.requests.sendCode(code);
      console.log(response);
      if (response) {
        localStorage.setItem(USER_ADMIN, JSON.stringify(true));
        window.location.href = "/";
      }
      return response;
    } catch (error) {
      this.codeErr =
        (error as any)?.response?.data?.error?.message ?? "Unknown error";
    } finally {
      this.setLoading(false);
    }
  };
}
