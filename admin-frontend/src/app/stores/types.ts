import { AuthStore } from "./AuthStore";

export type IRootStore = {
  /** stores */
  authStore: AuthStore;

  /** ui stores */
};
