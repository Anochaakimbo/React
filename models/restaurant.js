import mongoose, { Schema } from "mongoose";

const menuItemSchema = new Schema({
    menu_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tags: [String],
    images: [String]
});

const openHoursSchema = new Schema({
    open: String,
    close: String
});

const weeklyHoursSchema = new Schema({
    monday: openHoursSchema,
    tuesday: openHoursSchema,
    wednesday: openHoursSchema,
    thursday: openHoursSchema,
    friday: openHoursSchema,
    saturday: openHoursSchema,
    sunday: openHoursSchema
});

const locationSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    latitude: String,
    longitude: String
});

const restaurantSchema = new Schema(
    {
        restaurant_id: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        description: String,
        location: locationSchema,
        open_hours: weeklyHoursSchema,
        status: {
            type: String,
            enum: ['open', 'closed', 'temporarily_closed'],
            default: 'open'
        },
        categories: [String],
        qr_code: String,
        menu_items: [menuItemSchema]
    },
    {
        timestamps: true
    }
);

const Restaurant = mongoose.models.Restaurant || mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;