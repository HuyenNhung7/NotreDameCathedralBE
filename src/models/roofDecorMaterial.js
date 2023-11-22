import mongoose from "mongoose";

const roofDecorMaterialtSchema = new mongoose.Schema({
    id_material  : {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    id_roofDecor : {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    ageStartTime : {
        type: String,
        required: true,
    },
}, {timestamps: true})
const RoofDecorMaterial = mongoose.model('roofDecorMaterial', roofDecorMaterialtSchema)
export default RoofDecorMaterial