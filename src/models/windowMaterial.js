import mongoose from "mongoose";
import validator from "validator";

const newsSchema = new mongoose.Schema(
    {
        idWindow: {
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
const windowMaterials = mongoose.model("windowMaterials", newsSchema);
export default windowMaterials;
