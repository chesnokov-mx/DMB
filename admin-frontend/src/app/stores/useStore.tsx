import { createContext, useContext } from "react";
import { IRootStore } from "./types";

const RootStoreContext = createContext<null | IRootStore>(null);

export const Provider = RootStoreContext.Provider;

export function useStore() {
  const context = useContext(RootStoreContext);
  if (!context) {
    throw new Error("useStore must be used within a RootStoreProvider");
  }
  return context;
}
