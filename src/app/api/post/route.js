import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Restaurant from "../../../../models/restaurant";

export async function POST(req) {
    try {
        const { 
            restaurant_id,
            name,
            description,
            location,
            open_hours,
            status,
            categories,
            qr_code,
            menu_items
        } = await req.json();

        await connectMongoDB();
        
        await Restaurant.create({
            restaurant_id,
            name,
            description,
            location,
            open_hours,
            status,
            categories,
            qr_code,
            menu_items
        });

        return NextResponse.json(
            { message: "Restaurant created successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating restaurant:", error);
        return NextResponse.json(
            { error: "Failed to create restaurant" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        await connectMongoDB();
        const restaurants = await Restaurant.find({});
        return NextResponse.json({ restaurants });
    } catch (error) {
        console.error("Error fetching restaurants:", error);
        return NextResponse.json(
            { error: "Failed to fetch restaurants" },
            { status: 500 }
        );
    }
}

// เพิ่มฟังก์ชันสำหรับค้นหาร้านอาหารตาม ID
export async function GET_BY_ID(req, { params }) {
    try {
        await connectMongoDB();
        const restaurant = await Restaurant.findOne({ restaurant_id: params.id });
        
        if (!restaurant) {
            return NextResponse.json(
                { message: "Restaurant not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ restaurant });
    } catch (error) {
        console.error("Error fetching restaurant:", error);
        return NextResponse.json(
            { error: "Failed to fetch restaurant" },
            { status: 500 }
        );
    }
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Restaurant.findByIdAndDelete(id);
    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}


export async function PUT(req) {
    try {
        const { 
            restaurant_id,
            name,
            description,
            location,
            open_hours,
            status,
            categories,
            qr_code,
            menu_items
        } = await req.json();

        await connectMongoDB();
        
        const updatedRestaurant = await Restaurant.findOneAndUpdate(
            { restaurant_id },
            {
                name,
                description,
                location,
                open_hours,
                status,
                categories,
                qr_code,
                menu_items
            },
            { new: true }
        );

        if (!updatedRestaurant) {
            return NextResponse.json(
                { message: "Restaurant not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ 
            message: "Restaurant updated successfully",
            restaurant: updatedRestaurant
        });
    } catch (error) {
        console.error("Error updating restaurant:", error);
        return NextResponse.json(
            { error: "Failed to update restaurant" },
            { status: 500 }
        );
    }
}