import WallDecor from "../models/wallDecor.js";

export const getAll = async (req, res) => {
    try {
        let result = await WallDecor.find()
        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const get = async (req, res) => {
    try {
        const _id = req.params.id;
        if(!_id){
            return res.status(200).send({"error":"id is required!"})
        }

        let result = await WallDecor.find({_id})
        if(!result){
            return res.status(404).send("Not found")
        }

        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const add = async (req, res) => {
    try {
        const wall = new WallDecor(req.body);
        await wall.save()

        res.status(201).send(wall)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const update = async (req, res) => {
    const _id = req.params.id
    if(!_id){
        return res.status(200).send({"error":"id is required!"})
    }
    
    const updates = Object.keys(req.body)
    try {
        let result = await WallDecor.findOne({_id})
        if(!result){
            return res.status(404).send('Not found')
        }

        updates.forEach(update => {
            result[update] = req.body[update]
        })

        await result.save()
        res.send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const deleteWallDecor = async (req, res) => {
    const _id = req.params.id;
    if(!_id){
        return res.status(200).send({"error":"id is required!"})
    }

    try {
        const wall = await WallDecor.findByIdAndDelete({ _id: req.params.id })
        if (!wall) {
            return res.status(404).send('Not found')
        }
        await res.send(wall)
    } catch (error) {
        res.status(500).send(error)
    }
}