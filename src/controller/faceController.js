import Face from "../models/face.js";
import Node from "../models/node.js";
export const getFace = async(req, res) => {
    let faces = []
    let filter = {}
    if(req.query.path)
    {
        const path = req.query.path
        filter.path = { $regex: path, $options: 'i' };
    }

    try {
        faces = await Face.find(filter);
        res.status(200).send(faces)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const addFace = async(req, res) => {
    const data = req.body
    let foundNode
    let idNodesArr = []
    try {
        const face = new Face({
            path: data.path,
            idNodes: idNodesArr
        })

        for (const node of data.nodes) {
            foundNode = await Node.findOne({ x: node[0], y: node[1], z: node[2] });
            if (foundNode) {
                face.idNodes.push(foundNode._id);
            }
        }

        await face.save()
        res.status(200).send(face)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const deleteFaceById = async(req, res) => {
    try {
        const face = await Face.findByIdAndDelete({ _id: req.params.id })
        if (!face) {
            return res.status(404).send('Not found')
        }
        await res.send(face)
    } catch (error) {
        res.status(500).send(error)
    }
}

