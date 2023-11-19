import Node from "../models/node.js";

export const getAllNodes = async (req, res) => {
    try {
        let result = await Node.find()
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const addManyNodes = async (req, res) => {
    const nodes = req.body.nodes
    let availableNode
    try {
        nodes.forEach(async node => {
            availableNode = await Node.findOne({x: node[0], y: node[1], z: node[2]})
            console.log(availableNode)
            if(!availableNode)
            {
                await Node.create({
                    x: node[0],
                    y: node[1],
                    z: node[2]
                })
            }
        });
        res.status(200).send("Insert successful!")
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
} 