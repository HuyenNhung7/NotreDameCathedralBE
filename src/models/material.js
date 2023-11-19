import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    age: Number,
    description: String
},{
    timestamps: true,
})