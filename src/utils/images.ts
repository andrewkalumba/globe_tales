import { createClient } from "@/utils/supabase/browser-client";

export const getImageUrl = (path?: string) => {
  if (!path) return "/sweden.jpg";
  const supabase = createClient();
  return supabase.storage.from("images").getPublicUrl(path).data.publicUrl;
};
