import mongoose from "mongoose";
import validator from "validator";

const newsSchema = new mongoose.Schema(
    {
        idDoor: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        idMaterial: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        ageStartTime: {
            type: Date,
            required: true,
            default: Date.now,
        },
    },
    { timestamps: true }
);
const doorMaterials = mongoose.model("doorMaterials", newsSchema);
export default doorMaterials;
