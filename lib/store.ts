import { create } from "zustand";
import { Topic } from "@/types";
import { topicsData } from "@/app/data/topics";

interface TopicStore {
  topics: Topic[];
  setTopics: (topics: Topic[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useTopicStore = create<TopicStore>((set) => ({
  topics: topicsData.topics,
  setTopics: (topics) => set({ topics }),
  isLoading: false, // We can start with false since we have the data immediately
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
