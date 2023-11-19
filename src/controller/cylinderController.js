import Cylinder from "../models/cylinder.js";
import Face from "../models/face.js";
import Node from "../models/node.js";
import mongoose from "mongoose";

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

export const addCylinder = async (req, res) => {
    try {
        const cylinder = new Cylinder()
        const {name, path, height, width} = req.body     
        let b = bArr.find(b => path.includes(b.name))

        cylinder.timestamps = new Date().toISOString();
        cylinder.features.push({
            type: "Feature",
            properties: {
                "Building name": name,
                Id: new mongoose.Types.ObjectId(),
                Path: path,
                Height: height,
                Width: width,
                Color: "#EE7621",
                Materials: "Gạch",
                Status: "Còn tốt",
                idb: b.idb
            },
            geometry: {
                type: "Polygon",
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
                cylinder.features[0].geometry.coordinates.push(arrayNodes);
                arrayNodes = [];
            }
        }
        await cylinder.save();
        res.status(201).send(cylinder)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

export const getAllCylinder = async (req, res) => {
    try {
        let listCylinders = await Cylinder.find()
        res.send(listCylinders);
    } catch (error) {
        console.log(error)
        res.status(400).send(error);
    }
}

export const getcylinderByPath = async (req, res) => {
    const path = req.query.path
    let filter = {'features.properties.Path':{ $regex: path, $options: 'i' }}
    try {
        const cylinder = await Cylinder.findOne(filter)
        if(cylinder)
        {
            res.status(200).send(cylinder)
        } else {
            res.status(400).send("Not found.")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const deletecylinderByPath = async(req, res) => {
    const path = req.query.path
    try {
        let cylinder = await Cylinder.findOneAndDelete({'features.properties.Path': path})
        if(cylinder)
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
        const cylinders = await Cylinder.find()
        cylinders.forEach((cylinder) => {
            paths.push(cylinder.features[0].properties.Path)
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