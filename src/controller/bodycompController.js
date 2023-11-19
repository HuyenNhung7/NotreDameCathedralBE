import BodyComp from "../models/bodyComp.js";
import Face from "../models/face.js";
import Node from "../models/node.js";
import mongoose from "mongoose";

const propBodyComp = [
    {
        name: "wall",
        detail: "Tường",
        color: "#FF7F24",
        material: "Gạch"
    },
    {
        name: "lowRoof",
        detail: "Mái nhà",
        color: "#8B4513",
        material: "Ngói"
    },
    {
        name: "highRoof",
        detail: "Mái nhà",
        color: "#EEEEE0",
        material: "Ngói"
    },
    {
        name: "window",
        detail: "Cửa sổ",
        color: "#EEEEE0",
        material: "Kính"
    },
    {
        name: "door",
        detail: "Cửa",
        color: "#CDC8B1",
        material: "Thép"
    }
] 
// b là building
const bArr = [
    {
        name: "leftBuilding",
        idb: 1,
    },
    {
        name: "centerBuilding",
        idb: 2,
    },
    {
        name: "rightBuilding",
        idb: 3,
    },
    {
        name: "crossBuilding",
        idb: 4,
    }
]

export const addBodyComp = async (req, res) => {
    try {
        const bodycomp = new BodyComp()
        const {name, path, height, width, material} = req.body
        let prop = propBodyComp.find(value => path.includes(value.name))
        let b = bArr.find(b => path.includes(b.name))
        
        bodycomp.timestamps = new Date().toISOString();
        bodycomp.features.push({
            type: "Feature",
            properties: {
                "Building name": name,
                Id: new mongoose.Types.ObjectId(),
                Path: path,
                Height: height,
                Width: width,
                Color: prop.color,
                Materials: material || prop.material,
                Status: "Còn tốt",
                idb: b.idb
            },
            geometry: {
                type: "MultiPolygon",
                coordinates: []
            }
        })

        let facePath = path.split(".")[0]
        console.log(facePath)
        
        let faces = await Face.find({path: { $regex: facePath, $options: 'i' }})

        let arrayNodes = []
        for (const face of faces) {
            for (const idNode of face.idNodes) {
                const node = await Node.findOne({ _id: idNode });
                if (node) {
                    arrayNodes.push([node.x, node.y, node.z]);
                }
            }

            if (arrayNodes.length > 0) {
                bodycomp.features[0].geometry.coordinates.push([arrayNodes]);
                arrayNodes = [];
            }
        }
        await bodycomp.save();
        res.status(201).send(bodycomp)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

export const getAllBodyComp = async (req, res) => {
    try {
        let listBodyComps = await BodyComp.find()
        res.send(listBodyComps);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
}

export const getBodyCompByPath = async (req, res) => {
    const path = req.query.path
    let filter = {'features.properties.Path':{ $regex: path, $options: 'i' }}
    try {
        const bodycomp = await BodyComp.findOne(filter)
        if(bodycomp)
        {
            res.status(200).send(bodycomp)
        } else {
            res.status(400).send("Not found.")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const deleteBodyCompByPath = async(req, res) => {
    const path = req.query.path
    try {
        let bodycomp = await BodyComp.findOneAndDelete({'features.properties.Path': path})
        if(bodycomp)
        {
            res.status(200).send("Delete successful")
        }
        else
        {
            res.status(400).send("NotFound")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const getAllPath =  async(req, res) => {
    let paths = []
    try {
        const bodycomps = await BodyComp.find()
        bodycomps.forEach((bodycomp) => {
            paths.push(bodycomp.features[0].properties.Path)
        })
        if(paths.length !== 0)
        {
            res.status(200).send(paths)
        } else {
            res.status(400).send("Not found.")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}