import mongoose from "mongoose";

const roofFaceSchema = new mongoose.Schema({
    idRoof: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    idFace: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
},
    {
        timestamps: true
    }
);

const RoofFace = mongoose.model('roofFace', roofFaceSchema)
export default RoofFace; 