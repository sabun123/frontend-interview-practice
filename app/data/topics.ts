import { TopicsData } from "@/types";

// NextJS wraps JSON imports with a default property which blocks our build
// with a TypeError. So we're using a data module approach here instead.

export const topicsData: TopicsData = {
  topics: [
    {
      id: "react",
      name: "React",
      icon: "code",
      description: "Core React concepts and patterns",
      questionsFile: "react-questions.json",
    },
    {
      id: "typescript",
      name: "TypeScript",
      icon: "file-type",
      description: "TypeScript fundamentals and advanced concepts",
      questionsFile: "typescript-questions.json",
    },
    {
      id: "css3",
      name: "CSS3",
      icon: "layout",
      description: "Modern CSS features and techniques",
      questionsFile: "css-questions.json",
    },
    {
      id: "rest-apis",
      name: "REST APIs",
      icon: "package",
      description: "RESTful API concepts and best practices",
      questionsFile: "rest-apis-questions.json",
    },
    {
      id: "nextjs",
      name: "Next.js",
      icon: "server",
      description: "Server-side rendering and modern React frameworks",
      questionsFile: "nextjs-questions.json",
    },
    {
      id: "html5",
      name: "HTML5",
      icon: "code-2",
      description: "Modern HTML features and semantics",
      questionsFile: "html-questions.json",
    },
    {
      id: "babel",
      name: "Babel",
      icon: "package",
      description: "JavaScript compilation and transformation",
      questionsFile: "babel-questions.json",
    },
  ],
};
