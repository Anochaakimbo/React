"use client"

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function CreateRestaurantPage() {
    const [formData, setFormData] = useState({
        restaurant_id: generateRestaurantId(),
        name: '',
        description: '',
        location: {
            address: '',
            latitude: '',
            longitude: ''
        },
        open_hours: {
            monday: { open: '', close: '' },
            tuesday: { open: '', close: '' },
            wednesday: { open: '', close: '' },
            thursday: { open: '', close: '' },
            friday: { open: '', close: '' },
            saturday: { open: '', close: '' },
            sunday: { open: '', close: '' }
        },
        status: 'open',
        categories: [],
        qr_code: '',
        menu_items: []
    });

    const [menuItem, setMenuItem] = useState({
        menu_id: '',
        name: '',
        description: '',
        price: '',
        category: '',
        tags: [],
        images: []
    });

    function generateRestaurantId() {
        // Generate a random string of numbers and letters
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return `REST${result}`;
    }

    const router = useRouter();

    const handleFormChange = (e, section = null) => {
        const { name, value } = e.target;
        if (section) {
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [name]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleLocationChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            location: {
                ...prev.location,
                [name]: value
            }
        }));
    };

    const handleMenuItemChange = (e) => {
        const { name, value } = e.target;
        setMenuItem(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addMenuItem = () => {
        setFormData(prev => ({
            ...prev,
            menu_items: [...prev.menu_items, { ...menuItem, menu_id: Date.now().toString() }]
        }));
        setMenuItem({
            menu_id: '',
            name: '',
            description: '',
            price: '',
            category: '',
            tags: [],
            images: []
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.location.address) {
            alert("Please fill in required fields (Name and Address)");
            return;      
        }

        try {
            const res = await fetch("http://localhost:3000/api/post", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                router.push("/");
            } else {
                throw new Error("Failed to create restaurant");
            }

        } catch(error) {
            console.log(error);
        }
    };

    return (
        <div className='container mx-auto py-10 px-4'>
            <h3 className='text-3xl font-bold'>Create Restaurant</h3>
            <hr className='my-3' />
            <Link href="/" className='bg-gray-500 inline-block text-white border py-2 px-3 rounded my-2'>Go back</Link>
            
            <form onSubmit={handleSubmit} className='space-y-6'>
                {/* Basic Information */}
                <div className='space-y-4'>
                    <h4 className='text-xl font-semibold'>Basic Information</h4>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className='w-full md:w-[400px] block bg-gray-200 border py-2 px-3 rounded'
                        placeholder='Restaurant Name *'
                    />
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        className='w-full md:w-[400px] block bg-gray-200 border py-2 px-3 rounded'
                        placeholder='Restaurant Description'
                    ></textarea>
                </div>

                {/* Location */}
                <div className='space-y-4'>
                    <h4 className='text-xl font-semibold'>Location</h4>
                    <input
                        type="text"
                        name="address"
                        value={formData.location.address}
                        onChange={handleLocationChange}
                        className='w-full md:w-[400px] block bg-gray-200 border py-2 px-3 rounded'
                        placeholder='Address *'
                    />
                    <div className='flex gap-4'>
                        <input
                            type="text"
                            name="latitude"
                            value={formData.location.latitude}
                            onChange={handleLocationChange}
                            className='w-full md:w-[195px] block bg-gray-200 border py-2 px-3 rounded'
                            placeholder='Latitude'
                        />
                        <input
                            type="text"
                            name="longitude"
                            value={formData.location.longitude}
                            onChange={handleLocationChange}
                            className='w-full md:w-[195px] block bg-gray-200 border py-2 px-3 rounded'
                            placeholder='Longitude'
                        />
                    </div>
                </div>

                {/* Menu Items */}
                <div className='space-y-4'>
                    <h4 className='text-xl font-semibold'>Add Menu Item</h4>
                    <div className='space-y-2'>
                        <input
                            type="text"
                            name="name"
                            value={menuItem.name}
                            onChange={handleMenuItemChange}
                            className='w-full md:w-[400px] block bg-gray-200 border py-2 px-3 rounded'
                            placeholder='Menu Item Name'
                        />
                        <input
                            type="number"
                            name="price"
                            value={menuItem.price}
                            onChange={handleMenuItemChange}
                            className='w-full md:w-[400px] block bg-gray-200 border py-2 px-3 rounded'
                            placeholder='Price'
                        />
                        <input
                            type="text"
                            name="category"
                            value={menuItem.category}
                            onChange={handleMenuItemChange}
                            className='w-full md:w-[400px] block bg-gray-200 border py-2 px-3 rounded'
                            placeholder='Category'
                        />
                        <button 
                            type="button"
                            onClick={addMenuItem}
                            className='bg-blue-500 text-white border py-2 px-3 rounded'
                        >
                            Add Menu Item
                        </button>
                    </div>

                    {/* Display added menu items */}
                    <div className='mt-4'>
                        <h5 className='font-semibold'>Added Menu Items:</h5>
                        <div className='space-y-2'>
                            {formData.menu_items.map((item, index) => (
                                <div key={index} className='bg-gray-100 p-2 rounded'>
                                    {item.name} - ฿{item.price}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className='space-y-4'>
                    <h4 className='text-xl font-semibold'>Status</h4>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        className='w-full md:w-[400px] block bg-gray-200 border py-2 px-3 rounded'
                    >
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                        <option value="temporarily_closed">Temporarily Closed</option>
                    </select>
                </div>

                {/* Submit Button */}
                <button 
                    type='submit' 
                    className='bg-green-500 text-white border py-2 px-6 rounded text-lg'
                >
                    Create Restaurant
                </button>
            </form>
        </div>
    );
}

export default CreateRestaurantPage;