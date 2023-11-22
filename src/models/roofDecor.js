import mongoose from "mongoose";

const roofDecorSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    width : {
        type: Number,
        required: true,
    },
    height : {
        type: Number,
        required: true,
    },
    color : {
        type: String,
        required: true,
    },
}, {timestamps: true})
const RoofDecor = mongoose.model('roofDecor', roofDecorSchema)
export default RoofDecor