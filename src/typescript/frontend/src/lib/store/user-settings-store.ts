import { readLocalStorageCache, writeLocalStorageCache } from "configs/local-storage-keys";
import { createStore } from "zustand";

type UserSettingsState = {
  animate: boolean;
  showEmptyBars: boolean;
};

type UserSettingsActions = {
  setAnimate: (value: boolean) => void;
  setShowEmptyBars: (fn: (prev: boolean) => boolean) => void;
  userAgent: string;
  toggleAnimate: () => void;
  getShowEmptyBars: () => boolean;
};

export type UserSettingsStore = UserSettingsState & UserSettingsActions;

const saveSettings = (state: UserSettingsState) => {
  writeLocalStorageCache("settings", state);
};

const defaultValues: UserSettingsState = {
  animate: true,
  showEmptyBars: true,
};

const readSettings = (): UserSettingsState => readLocalStorageCache("settings") ?? defaultValues;

const createUserSettingsStore = (userAgent: string) =>
  createStore<UserSettingsStore>()((set, get) => ({
    ...readSettings(),
    userAgent,
    getShowEmptyBars: () => get().showEmptyBars,
    setShowEmptyBars: (fn: (prev: boolean) => boolean) =>
      set((state) => {
        const newState = { ...state, showEmptyBars: fn(state.showEmptyBars) };
        saveSettings(newState);
        return newState;
      }),
    setAnimate: (value) =>
      set((state) => {
        const newState = { ...state, animate: value };
        saveSettings(newState);
        return newState;
      }),
    toggleAnimate: () =>
      set((state) => {
        const newState = { ...state, animate: !state.animate };
        saveSettings(newState);
        return newState;
      }),
  }));

export default createUserSettingsStore;
