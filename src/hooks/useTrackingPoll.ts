"use client";
import { useEffect, useState, useCallback } from "react";
import type { PublicTrackingData } from "@/types";

export function useTrackingPoll(trackingNumber: string, interval = 30000) {
  const [data, setData] = useState<PublicTrackingData | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  const poll = useCallback(async () => {
    try {
      const res = await fetch(`/api/track/${trackingNumber}`);
      if (!res.ok) throw new Error("Not found");
      const json = await res.json();
      setData(json);
      setLastUpdated(new Date());
      setError(null);
    } catch {
      setError("Failed to refresh tracking data");
    }
  }, [trackingNumber]);

  useEffect(() => {
    poll();
    const id = setInterval(() => {
      if (!document.hidden) poll();
    }, interval);
    const onVisible = () => { if (!document.hidden) poll(); };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [poll, interval]);

  return { data, lastUpdated, error };
}
