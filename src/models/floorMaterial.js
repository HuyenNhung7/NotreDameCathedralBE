import mongoose from "mongoose";

const floorMaterialSchema = new mongoose.Schema({
    idFloor: {
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

const floorMaterial = mongoose.model('floorMaterial', floorMaterialSchema)
export default floorMaterial; 