"use server";

import { postSchemas } from "./schemas";
import { createClient } from "@/utils/supabase/server-client";
import { slugify } from "@/utils/slugifys";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Database, TablesInsert } from "@/utils/supabase/database-types";

export const CreatePost = async (userdata: Database["public"]["Tables"]["posts"]["Insert"]) => {

    const parsedData = postSchemas.parse({
        title: userdata.title,
        content: userdata.content,
        image: userdata.images
    });

    const slug = slugify(parsedData.title);

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Not authorized");

    const { error } = await supabase
        .from("posts")
        .insert([{
            user_id: user.id,
            slug,
            title: parsedData.title,
            content: parsedData.content,
            images: userdata.images || null
        }])
        .throwOnError();

    if (error) throw error;

    revalidatePath("/");
    redirect(`/${slug}`);
};
