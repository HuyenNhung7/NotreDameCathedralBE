import mongoose from "mongoose";

const damageReportSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    cause: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    id_account: {
        type: mongoose.Types.ObjectId,
        ref: 'account',
        required: true,
    },
    id_entity: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
}, {timestamps: true})
const DamageReport = mongoose.model('damageReport', damageReportSchema)
export default DamageReport