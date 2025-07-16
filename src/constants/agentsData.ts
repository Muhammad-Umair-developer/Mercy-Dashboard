interface ChatAgent {
  id: string;
  name: string;
  avatar: string;
  message: string;
  timestamp: string;
  date: string;
  type: "Photo Editing" | "Photo Manipulation" | "Design" | "Video Editing";
  isOnline: boolean;
}

export const agentsData: ChatAgent[] = [
  {
    id: "1",
    name: "Sasha",
    avatar: "/assets/layout/Sasha.png",
    message: "Welcome to Edits by Mercy",
    timestamp: "May 21, 2025 - 08:22 AM",
    date: "May 21, 2025",
    type: "Photo Editing",
    isOnline: true,
  },
  {
    id: "2",
    name: "Sasha",
    avatar: "/assets/layout/Sasha.png",
    message: "Welcome to Edits by Mercy",
    timestamp: "May 21, 2025 - 08:22 AM",
    date: "May 21, 2025",
    type: "Photo Manipulation",
    isOnline: true,
  },
  {
    id: "3",
    name: "Sasha",
    avatar: "/assets/layout/Sasha.png",
    message: "Welcome to Edits by Mercy",
    timestamp: "May 21, 2025 - 08:22 AM",
    date: "May 21, 2025",
    type: "Photo Editing",
    isOnline: true,
  },
  {
    id: "4",
    name: "Sasha",
    avatar: "/assets/layout/Sasha.png",
    message: "Welcome to Edits by Mercy",
    timestamp: "May 21, 2025 - 08:22 AM",
    date: "May 21, 2025",
    type: "Photo Editing",
    isOnline: true,
  },
  {
    id: "5",
    name: "Alex",
    avatar: "/assets/layout/admin.png",
    message: "How can I help you today?",
    timestamp: "May 21, 2025 - 08:20 AM",
    date: "May 21, 2025",
    type: "Photo Manipulation",
    isOnline: true,
  },
  {
    id: "6",
    name: "Maria",
    avatar: "/assets/layout/Sasha.png",
    message: "Project completed successfully",
    timestamp: "May 21, 2025 - 08:18 AM",
    date: "May 20, 2025",
    type: "Design",
    isOnline: false,
  },
  {
    id: "7",
    name: "John",
    avatar: "/assets/layout/admin.png",
    message: "Video editing in progress",
    timestamp: "May 21, 2025 - 08:15 AM",
    date: "May 21, 2025",
    type: "Video Editing",
    isOnline: true,
  },
  {
    id: "8",
    name: "Emma",
    avatar: "/assets/layout/Sasha.png",
    message: "Ready for new projects",
    timestamp: "May 21, 2025 - 08:10 AM",
    date: "May 21, 2025",
    type: "Photo Editing",
    isOnline: true,
  },
];

export type { ChatAgent };
