"use client"
import { createClient } from "@/utils/supabase/browser-client";
import { getHomePosts, HomePostType } from "@/utils/supabase/queries";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const HomePosts = ({ posts }: { posts: HomePostType }) => {
    const { data, refetch, isStale } = useQuery({
        queryKey: ["home-post"],
        queryFn: async () => {
            const supabase = await createClient();
            const { data, error } = await getHomePosts(supabase);
            if (error) throw error;
            return data;
        },
        initialData: posts,
        refetchOnMount: false,
        // staleTime: 10000,
        refetchInterval: 10000,
    });

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="bg-[url('/image11.jpg')] bg-cover bg-center rounded-4xl">
                <div className="flex flex-row flex-wrap gap-6 justify-center items-center p-6">
                    {data &&
                        data.map(({ id, slug, title, users }) => (
                            <Link href={`/${slug}`} key={id} className="w-1/3.5 bg-neutral-900/80 border border-neutral-800 rounded-2xl shadow-lg p-10 flex flex-col justify-between hover:scale-105 hover:shadow-blue-950 transition-all">
                                <h2 className="font-medium text-lg text-blue-100 mb-3 pb-4">{title}</h2>
                                <div className="text-sm text-gray-400 text-right">
                                    Posted:{" "}
                                    <span className="text-gray-400 capitalize">
                                        {users.username}
                                    </span>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>

        </div>
    );
};

export default HomePosts;
