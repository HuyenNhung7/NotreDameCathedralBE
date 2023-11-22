import RoofFace from '../models/roofFace.js'

export const getAll = async (req, res) => {
    try {
        let result = await RoofFace.find()
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

        let result = await RoofFace.findById(_id)
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
        const roofFace = new RoofFace(req.body);
        await roofFace.save()

        res.status(201).send(roofFace)
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
        let result = await RoofFace.findOne({_id})
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

export const deleteRoofFace = async (req, res) => {
    const _id = req.params.id;
    if(!_id){
        return res.status(200).send({"error":"id is required!"})
    }

    try {
        const roofFace = await RoofFace.findByIdAndDelete({ _id: req.params.id })
        if (!roofFace) {
            return res.status(404).send('Not found')
        }
        await res.send(roofFace)
    } catch (error) {
        res.status(500).send(error)
    }
}