"use client";

import dynamic from "next/dynamic";

const ChatFab = dynamic(() => import("@/components/chat-fab"), {
  ssr: false,
});

export function ChatFabLoader() {
  return <ChatFab />;
}
