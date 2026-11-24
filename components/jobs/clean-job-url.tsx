"use client";

import { useEffect } from "react";

/** Drop ?jid= from the address bar after soft-nav without a second server resolve. */
export function CleanJobUrl({ path }: { path: string }) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.search.includes("jid=")) return;
    window.history.replaceState(window.history.state, "", path);
  }, [path]);

  return null;
}
