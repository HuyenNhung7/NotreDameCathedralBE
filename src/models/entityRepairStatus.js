import mongoose from "mongoose";
import validator from "validator";

const newsSchema = new mongoose.Schema(
    {
        startDate: {
            type: Date,
            required: true,
        },
        finishDate: {
            type: Date,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        repairReason: {
            type: String,
            required: true,
        },
        idEntity: {
            type: mongoose.Types.ObjectId,
        },
        idAccount: {
            type: mongoose.Types.ObjectId,
        },
    },
    { timestamps: true }
);
const entityRepairStatus = mongoose.model("entityRepairStatus", newsSchema);
export default entityRepairStatus;
