"use client";

import { useEffect } from "react";

interface ClientBodyProps {
  children: React.ReactNode;
  className?: string;
}

export default function ClientBody({
  children,
  className = "antialiased",
}: ClientBodyProps) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = className;
  }, [className]);

  return (
    <body className={className} suppressHydrationWarning>
      {children}
    </body>
  );
}
