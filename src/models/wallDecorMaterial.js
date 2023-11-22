import mongoose from "mongoose";

const wallDecorMaterialSchema = new mongoose.Schema({
    id_material  : {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    id_wallDecor : {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    ageStartTime : {
        type: String,
        required: true,
    },
}, {timestamps: true})
const WallDecorMaterial = mongoose.model('wallDecorMaterial', wallDecorMaterialSchema)
export default WallDecorMaterial