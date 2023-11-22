import mongoose from "mongoose";

const roofSchema = new mongoose.Schema({
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

const Roof = mongoose.model('roof', roofSchema)
export default Roof; 