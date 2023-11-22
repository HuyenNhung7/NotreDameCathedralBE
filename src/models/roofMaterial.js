import mongoose from "mongoose";

const roofMaterialSchema = new mongoose.Schema({
    idRoof: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    idMaterial: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    AgeStartTime: {
        type: Date,
    }
},
    {
        timestamps: true
    }
);

const RoofMaterial = mongoose.model('roofMaterial', roofMaterialSchema)
export default RoofMaterial; 