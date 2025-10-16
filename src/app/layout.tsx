import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css";
import { QueryClientProvider } from "@/providers/query-client-provider";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Globe Tales",
  description: "Real voices. Real places. One planet — through the eyes of explorers and storytellers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-800">
        <Toaster />
        <QueryClientProvider>
          <ReactQueryDevtools />
          {children}
          <SpeedInsights />
        </QueryClientProvider>
      </body>
    </html>
  );
}
