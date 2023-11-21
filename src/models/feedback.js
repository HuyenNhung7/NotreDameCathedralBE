import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    sdt: {
        type: String,
    },
    message: {
        type: String,
    },
},
    {
        timestamps: true
    }
);

const Feedback = mongoose.model('feedback', feedbackSchema)
export default Feedback; 