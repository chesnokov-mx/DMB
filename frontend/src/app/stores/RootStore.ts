import { AuthStore } from "./AuthStore";

class RootStore {
  constructor() {
    this.authStore = new AuthStore();
  }

  readonly authStore: AuthStore;
}

export default new RootStore();
