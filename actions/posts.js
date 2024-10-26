"use server";

import {storePost, updatePostLikeStatus} from "@/lib/posts";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function createPost(prevState,formData) {
    const title = formData.get('title');
    const image = formData.get('image');
    const content = formData.get('content');

    let errors = []

    if (!title || title.trim().length === 0) {
        errors.push("Title is required");
    }
    if (!content || content.trim().length === 0) {
        errors.push("Content is required");
    }

    if (!image) {
        errors.push("Image is required");
    }

    if (errors.length > 0) {
        return {
            errors,
        };
    }


    await storePost({
        imageUrl: '',
        title,
        content,
        userId: 1
    });

    revalidatePath("/feed");
    redirect("/feed");
}

export async function togglePostLikeStatus(postId) {
    await updatePostLikeStatus(postId,2);
    // some data of some page changed.
    // we can set a second parameter and name it layout.
    revalidatePath("/feed");
}