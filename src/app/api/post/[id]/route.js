import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Restaurant from "../../../../../models/restaurant";

export async function GET(req, { params }) {
    const { id } = params;

    try {
        await connectMongoDB();
        const post = await Restaurant.findById(id);

        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ post }, { status: 200 });
    } catch (error) {
        console.error("Failed to fetch post:", error);
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { id } = params;
    const { newTitle: title, newImg: img, newContent: content } = await req.json();

    try {
        await connectMongoDB();
        const updatedPost = await Post.findByIdAndUpdate(id, { title, img, content }, { new: true });

        if (!updatedPost) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Post updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Failed to update post:", error);
        return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
    }
}
