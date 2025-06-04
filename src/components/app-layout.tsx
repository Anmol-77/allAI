"use client";

import { Sidebar } from "@/components/sidebar";
import { ChatArea } from "@/components/chat-area";

export function AppLayout() {
  return (
    <div className="flex h-screen bg-zinc-900 text-white">
      <Sidebar />
      <div className="flex-1 ">
        <ChatArea />
      </div>
    </div>
  );
}
