import { createFileRoute } from "@tanstack/react-router";

// Chat is handled directly in src/server.ts (POST /api/chat) using the Anthropic API.
// This file keeps the route registered in TanStack Router's file-based routing.
export const Route = createFileRoute("/api/chat")({} as any);
