"use client";

import { createContext, type ReactNode, useRef } from "react";
import type { StoreApi } from "zustand";

import { createEventStore } from "@/store/event/event-store";
import type { EventStore } from "@/store/event/types";
import { createNameStore, type NameStore } from "@/store/name-store";
import createUserSettingsStore, { type UserSettingsStore } from "@/store/user-settings-store";
import type { WebSocketClientStore } from "@/store/websocket/store";

/**
 *
 * -------------------
 * Event Store Context
 * -------------------
 *
 */

export const EventStoreContext = createContext<{
  events: StoreApi<EventStore & WebSocketClientStore>;
  names: StoreApi<NameStore>;
} | null>(null);

interface EventStoreProviderProps {
  children: ReactNode;
}

export const EventStoreProvider = ({ children }: EventStoreProviderProps) => {
  const eventStore = useRef(createEventStore());
  const nameStore = useRef(createNameStore());

  return (
    <EventStoreContext.Provider
      value={{
        events: eventStore.current,
        names: nameStore.current,
      }}
    >
      {children}
    </EventStoreContext.Provider>
  );
};

/**
 *
 * ---------------------
 * User Settings Context
 * ---------------------
 *
 */
export const UserSettingsContext = createContext<StoreApi<UserSettingsStore> | null>(null);

interface UserSettingsProviderProps {
  userAgent: string;
  children: ReactNode;
}

export const UserSettingsProvider = ({ userAgent, children }: UserSettingsProviderProps) => {
  const store = useRef<StoreApi<UserSettingsStore>>();
  if (!store.current) {
    store.current = createUserSettingsStore(userAgent);
  }
  return (
    <UserSettingsContext.Provider value={store.current}>{children}</UserSettingsContext.Provider>
  );
};
