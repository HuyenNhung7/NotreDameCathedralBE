import mongoose from "mongoose";
import Node from "./node.js";

const faceSchema = new mongoose.Schema({
    path: {
        type: String,
        require: true,
        trim: true,
    },
    idNodes: {
        type: [mongoose.Types.ObjectId]
    }
}, {timestamps: true})
const Face = mongoose.model('face', faceSchema)
export default Face