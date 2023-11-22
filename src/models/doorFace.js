import mongoose from "mongoose";
import validator from "validator";

const newsSchema = new mongoose.Schema(
    {
        idDoor: {
            type: [mongoose.Types.ObjectId],
            required: true,
        },
        idFace: {
            type: [mongoose.Types.ObjectId],
            required: true,
        },
    },
    { timestamps: true }
);
const doorFaces = mongoose.model("doorFaces", newsSchema);
export default doorFaces;
