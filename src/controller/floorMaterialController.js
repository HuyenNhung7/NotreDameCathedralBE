import FloorMaterial from '../models/floorMaterial.js'

export const getAll = async (req, res) => {
    try {
        let result = await FloorMaterial.find()
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

        let result = await FloorMaterial.findById(_id)
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
        const floorMaterial = new FloorMaterial(req.body);
        await floorMaterial.save()

        res.status(201).send(floorMaterial)
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
        let result = await FloorMaterial.findOne({_id})
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

export const deleteFloorMaterial = async (req, res) => {
    const _id = req.params.id;
    if(!_id){
        return res.status(200).send({"error":"id is required!"})
    }

    try {
        const floorMaterial = await FloorMaterial.findByIdAndDelete({ _id: req.params.id })
        if (!floorMaterial) {
            return res.status(404).send('Not found')
        }
        await res.send(floorMaterial)
    } catch (error) {
        res.status(500).send(error)
    }
}