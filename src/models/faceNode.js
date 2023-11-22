import mongoose from "mongoose";

const faceNodeSchema = new mongoose.Schema({
    idFace: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    idNode: {
        type: mongoose.Types.ObjectId,
        required: true,
    }
},
    {
        timestamps: true
    }
);

const FaceNode = mongoose.model('faceNode', faceNodeSchema)
export default FaceNode; 