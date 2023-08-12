import { Code, ImageIcon, MusicIcon, VideoIcon, MessageSquare } from "lucide-react";

export const MAX_FREE_COUNTS = 5;

export const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      href: "/conversation",
      color: "text-violet-500",
      bgColor: "bg-violet-500/10",
    },
    {
      label: "Image Generation",
      icon: ImageIcon,
      href: "/image",
      color: "text-pink-500",
      bgColor: "text-pink-500/10",
    },
    {
      label: "Video Generation",
      icon: VideoIcon,
      href: "/video",
      color: "text-orange-500",
      bgColor: "text-orange-500/10",
    },
    {
      label: "Music Generation",
      icon: MusicIcon,
      href: "/music",
      color: "text-emerald-500",
      bgColor: "text-emerald-500/10",
    },
    {
      label: "Code Generation",
      icon: Code,
      href: "/code",
      color: "text-green-500",
      bgColor: "text-green-500/10",
    },
  ];