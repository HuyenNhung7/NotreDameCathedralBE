import mongoose from "mongoose";

const bodyCompSchema = new mongoose.Schema({
    type: {
        type: String,
        default: "FeatureCollection"
    },
    generator: {
        type: String,
        default: "Nhóm 4"
    },
    copyright: {
        type: String,
        default: "Nhóm 4"
    },
    timestamps: {
        type: String,
        default: "2023-11-05T08:00:12.745Z"
    },
    features: [
        {
            type: {
                type: String,
                default: "Feature",
            },
            properties: {
                "Building name": {
                    type: String,
                    default: "a"
                },
                Id: {
                    type: String,
                    default: "a"
                },
                Path: {
                    type: String,
                    default: "a",
                    unique: true
                },
                Height: {
                    type: Number,
                    default: 15
                },
                Width: {
                    type: Number,
                    default: 10
                },
                Color: {
                    type: String,
                    default: "#FF7F24"
                },
                Materials: {
                    type: String,
                    default: "gạch"
                },
                Status: {
                    type: String,
                    default: "Còn tốt"
                },
                idb: {
                    type: String,
                    default: "1"
                }
            },
            geometry: {
                type: {
                    type: String,
                    default: "MultiPolygon"
                },
                coordinates: {
                    type: [[[[Number]]]],
                    default: [[[[1,2,3,4]]]]
                }
            },
            _id: false
        }
    ],
})

const BodyComp = mongoose.model("bodyComp", bodyCompSchema);
export default BodyComp;