import mongoose from "mongoose";
const nodeSchema = new mongoose.Schema({
    x: {
        type: Number,
        require: true
    },

    y: {
        type: Number,
        require: true
    },

    z: {
        type: Number,
        require: true
    },
}, {timestamps: true})
const Node = mongoose.model("node", nodeSchema)
export default Node