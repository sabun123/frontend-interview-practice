"use client";

import { useEffect } from "react";
import { useTopicStore } from "@/lib/store";
import { topicsData } from "@/app/data/topics";

export function TopicsProvider({ children }: { children: React.ReactNode }) {
  const setTopics = useTopicStore((state) => state.setTopics);
  const setIsLoading = useTopicStore((state) => state.setIsLoading);

  useEffect(() => {
    setTopics(topicsData.topics);
    setIsLoading(false);
  }, [setTopics, setIsLoading]);

  return children;
}
