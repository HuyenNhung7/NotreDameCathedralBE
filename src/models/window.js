import mongoose from "mongoose";
import validator from "validator";

const newsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        width: {
            type: Number,
            required: true,
            min: 0,
        },
        height: {
            type: Number,
            required: true,
            min: 0,
        },
        color: {
            type: String,
            required: true,
        },
        radius: {
            type: Number,
            required: true,
        },
        idFace: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        idHalfCircle: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);
const windows = mongoose.model("windows", newsSchema);
export default windows;
