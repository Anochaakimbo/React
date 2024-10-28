"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

function EditPostPage({ params }) {
    const { id } = params;
    const [postData, setPostData] = useState({});
    
    const [formData, setFormData] = useState({
        title: '',
        img: '',
        content: ''
    });

    const router = useRouter();

    // Fetch post data by ID
    const getPostById = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/post/${id}`, {
                method: "GET",
                cache: "no-store"
            });

            if (!res.ok) {
                throw new Error("Failed to fetch post data");
            }

            const data = await res.json();
            setPostData(data.post);
            setFormData({
                title: data.post?.title || '',
                img: data.post?.img || '',
                content: data.post?.content || ''
            });

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getPostById(id);
    }, [id]);

    // Handle form data change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/api/post/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                throw new Error("Failed to update post");
            }

            router.push("/");

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='container mx-auto py-10 px-4'>
            <h3 className='text-3xl font-bold'>Edit Post</h3>
            <hr className='my-3' />
            <Link href="/" className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
            
            <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Title */}
                <div className='space-y-4'>
                    <h4 className='text-xl font-semibold'>Title</h4>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className='w-full md:w-[400px] block bg-gray-200 border py-2 px-3 rounded'
                        placeholder="Title"
                    />
                </div>

                {/* Image URL */}
                <div className='space-y-4'>
                    <h4 className='text-xl font-semibold'>Image URL</h4>
                    <input
                        type="text"
                        name="img"
                        value={formData.img}
                        onChange={handleInputChange}
                        className='w-full md:w-[400px] block bg-gray-200 border py-2 px-3 rounded'
                        placeholder="Image URL"
                    />
                </div>

                {/* Content */}
                <div className='space-y-4'>
                    <h4 className='text-xl font-semibold'>Content</h4>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        className='w-full md:w-[400px] block bg-gray-200 border py-2 px-3 rounded'
                        placeholder="Content"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                    type='submit' 
                    className='bg-green-500 text-white border py-2 px-6 rounded text-lg'
                >
                    Update Post
                </button>
            </form>
        </div>
    )
}

export default EditPostPage;
