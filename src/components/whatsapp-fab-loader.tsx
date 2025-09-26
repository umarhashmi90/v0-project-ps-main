"use client";

import dynamic from "next/dynamic";

const WhatsAppFab = dynamic(() => import("@/components/whatsapp-fab"), {
  ssr: false,
});

export function WhatsAppFabLoader() {
  return <WhatsAppFab />;
}
