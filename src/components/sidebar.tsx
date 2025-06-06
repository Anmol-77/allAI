"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft,PlusCircle, MessageSquare, Users, Award, ExternalLink } from "lucide-react";
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


    return (
      <div className={`flex items-center gap-3 p-3 rounded-md hover:bg-zinc-800/50 cursor-pointer ${active ? 'bg-zinc-800/70' : ''}`}>
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full`}>
          {icon}
        </div>
        <div className="flex flex-col overflow-hidden justify-center">
          <p className="text-sm font-medium text-zinc-100 text-center">{title}</p>
          {preview && (
            <p className="text-xs text-zinc-400 truncate text-center">{preview}</p>
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
                icon={<PlusCircle className="h-4 w-4 text-white" />}                   
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
                
      </ScrollArea>
    </div>
  );
}
