import mongoose from "mongoose";

const wallDecorSchema = new mongoose.Schema({
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
const WallDecor = mongoose.model('wallDecor', wallDecorSchema)
export default WallDecor