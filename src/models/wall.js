import mongoose from "mongoose";

const wallSchema = new mongoose.Schema({
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
const Wall = mongoose.model('wall', wallSchema)
export default Wall