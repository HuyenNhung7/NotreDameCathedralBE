import mongoose from "mongoose";

const floorSchema = new mongoose.Schema({
    idFace:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
    color: {
        type: String,
    }
},
    {
        timestamps: true
    }
);

const Floor = mongoose.model('floor', floorSchema)
export default Floor; 