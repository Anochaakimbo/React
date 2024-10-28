"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import DeleteBtn from "./DeleteBtn";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);

  


  const getRestaurants = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/post", {
        method: "GET",
        cache: "no-store",
      });
      
      if (!res.ok) {
        throw new Error("Failed to fetch restaurants");
      }

      const data = await res.json();
      setRestaurants(data.restaurants);
    } catch (error) {
      console.log("Error loading restaurants:", error);
    }
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Restaurant Management System</h1>
          <p className="text-gray-600 mt-2">Manage your restaurants and menus</p>
        </div>
        <Link 
          href="/create" 
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Add New Restaurant
        </Link>
      </div>

      <hr className="my-6"/>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <div 
              key={restaurant._id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-200"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {restaurant.name}
                  </h2>
                  <span className={`px-2 py-1 rounded-full text-sm font-semibold
                    ${restaurant.status === 'open' ? 'bg-green-100 text-green-800' : 
                      restaurant.status === 'closed' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'}`}
                  >
                    {restaurant.status}
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Location:</span> {restaurant.location.address}
                  </p>
                  
                  <div>
                    <span className="font-medium">Categories:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {restaurant.categories.map((category, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="font-medium">Menu Items:</span>
                    <p className="text-gray-600">
                      {restaurant.menu_items?.length || 0} items available
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <Link 
                    href={`/edit/${restaurant._id}`}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-center py-2 rounded transition duration-200"
                  >
                    Edit
                  </Link>
                  <Link 
                    href={`/menu/${restaurant._id}`}
                    className="flex-1 bg-purple-500 hover:bg-purple-600 text-white text-center py-2 rounded transition duration-200"
                  >
                    Menu
                  </Link>
                  <DeleteBtn id={restaurant._id} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <p className="text-gray-500 text-lg">No restaurants available</p>
              <Link 
                href="/create" 
                className="inline-block mt-4 text-blue-500 hover:text-blue-600 font-medium"
              >
                Add your first restaurant
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}