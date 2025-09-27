import { redirect } from "next/navigation";
import HomePosts from "@/components/Home/HomePosts";
import { getHomePosts } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server-client";

export default async function Home() {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (!user || userError) {
    redirect("/auth/login");
  }

  const { data, error } = await getHomePosts(supabase);


  return (
    <div className="flex flex-col gap-3 justify-between items-center p-4">
      {data ? <HomePosts posts={data} /> : <p className="text-red-500">Failed to fetch posts</p>}
    </div>
  );
}
