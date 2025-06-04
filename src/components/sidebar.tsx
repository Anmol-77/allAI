"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, MessageSquare, Users, Award, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface SidebarItemProps {
  icon: React.ReactNode;
  title: string;
  preview?: string;
  active?: boolean;
  variant?: "default" | "warning" | "info" | "success";
}

const SidebarItem = ({
  icon,
  title,
  preview,
  active = false,
  variant = "default"
}: SidebarItemProps) => {
  // Map variants to background colors
  const variantClasses = {
    default: "bg-orange-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
    success: "bg-green-500"
  };

  return (
    <div className={`flex items-start gap-3 p-3 rounded-md hover:bg-zinc-800/50 cursor-pointer ${active ? 'bg-zinc-800/70' : ''}`}>
      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${variantClasses[variant]}`}>
        {icon}
      </div>
      <div className="flex flex-col overflow-hidden">
        <p className="text-sm font-medium text-zinc-100">{title}</p>
        {preview && (
          <p className="text-xs text-zinc-400 truncate">{preview}</p>
        )}
      </div>
    </div>
  );
};

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={`flex flex-col h-full bg-zinc-900 border-r border-zinc-800 ${collapsed ? 'w-16' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center gap-2 p-4">
        {/* <Avatar className="h-7 w-7 bg-zinc-700">
          <span className="text-cyan-400 font-bold text-xs">O</span>
        </Avatar> */}
        {!collapsed && (
          <h2 className="text-lg font-semibold text-white">Outlier Playground</h2>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-8 w-8 text-zinc-400"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft className={`h-4 w-4 ${collapsed ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Main links */}
      {!collapsed && (
        <>
          <div className="px-3 py-2">
            <nav className="space-y-1">
              <Link href="#">
                <SidebarItem
                  icon={<MessageSquare className="h-4 w-4 text-white" />}
                  title="Daily Sparks"
                  active
                />
              </Link>
              <Link href="#">
                <SidebarItem
                  icon={<Award className="h-4 w-4 text-white" />}
                  title="Leaderboard"
                />
              </Link>
              <Link href="#">
                <SidebarItem
                  icon={<MessageSquare className="h-4 w-4 text-white" />}
                  title="Chat"
                />
              </Link>
            </nav>
          </div>

          <Separator className="my-2 bg-zinc-800" />

          {/* Section label */}
          <div className="px-4 py-2">
            <h3 className="text-xs font-medium text-zinc-500">Earlier</h3>
          </div>
        </>
      )}

      {/* Scrollable chat list */}
      <ScrollArea className="flex-1">
        {collapsed ? (
          <div className="flex flex-col items-center gap-3 py-3">
            {[
              { icon: <MessageSquare className="h-4 w-4 text-white" />, variant: "success" },
              { icon: <MessageSquare className="h-4 w-4 text-white" />, variant: "success" },
              { icon: <MessageSquare className="h-4 w-4 text-white" />, variant: "warning" },
              { icon: <MessageSquare className="h-4 w-4 text-white" />, variant: "warning" },
              { icon: <MessageSquare className="h-4 w-4 text-white" />, variant: "default" },
              { icon: <MessageSquare className="h-4 w-4 text-white" />, variant: "default" },
              { icon: <MessageSquare className="h-4 w-4 text-white" />, variant: "info" },
              { icon: <MessageSquare className="h-4 w-4 text-white" />, variant: "info" },
              { icon: <MessageSquare className="h-4 w-4 text-white" />, variant: "success" },
              { icon: <MessageSquare className="h-4 w-4 text-white" />, variant: "default" }
            ].map((item, i) => (
              <div
                key={`collapsed-item-${i}`}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  item.variant === "default" ? "bg-orange-500" :
                  item.variant === "warning" ? "bg-yellow-500" :
                  item.variant === "info" ? "bg-blue-500" : "bg-green-500"
                }`}
              >
                {item.icon}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-3 py-2">
            <div className="space-y-1">
              <SidebarItem
                icon={<MessageSquare className="h-4 w-4 text-white" />}
                title="Request for Solution"
                preview="To find the matrices I(A∨) and..."
                variant="success"
              />
              <SidebarItem
                icon={<MessageSquare className="h-4 w-4 text-white" />}
                title="Centrally Symmetric Distribution"
                preview="The statement you're referring..."
                variant="success"
              />
              <SidebarItem
                icon={<MessageSquare className="h-4 w-4 text-white" />}
                title="Podcast Workflow Development"
                preview="I'm drawn to working with you..."
                variant="warning"
              />
              <SidebarItem
                icon={<MessageSquare className="h-4 w-4 text-white" />}
                title="MongoDB Validation Error"
                preview="I rated this schema 5/7 because..."
                variant="warning"
              />
              <SidebarItem
                icon={<MessageSquare className="h-4 w-4 text-white" />}
                title="HTML CSS JavaScript Separation"
                preview="There are a few issues in your..."
                variant="default"
              />
              <SidebarItem
                icon={<MessageSquare className="h-4 w-4 text-white" />}
                title="Custom Unpickling for Torch"
                preview="Yes, there are a few potential..."
                variant="default"
              />
              <SidebarItem
                icon={<MessageSquare className="h-4 w-4 text-white" />}
                title="Custom Unpickling Module"
                preview="import torch import pickle from..."
                variant="info"
              />
              <SidebarItem
                icon={<MessageSquare className="h-4 w-4 text-white" />}
                title="Expertise and Expectations"
                preview="This is a strong implementation..."
                variant="info"
              />
              <SidebarItem
                icon={<MessageSquare className="h-4 w-4 text-white" />}
                title="String Hashing Overview"
                preview="Yes, the individual hash values..."
                variant="success"
              />
              <SidebarItem
                icon={<MessageSquare className="h-4 w-4 text-white" />}
                title="Password Management System"
                preview="Hint Validity and Relevance Prop..."
                variant="default"
              />
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
