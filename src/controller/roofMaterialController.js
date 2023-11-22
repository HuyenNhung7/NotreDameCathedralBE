import RoofMaterial from '../models/roofMaterial.js'

export const getAll = async (req, res) => {
    try {
        let result = await RoofMaterial.find()
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

        let result = await RoofMaterial.findById(_id)
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
        const roofMaterial = new RoofMaterial(req.body);
        await roofMaterial.save()

        res.status(201).send(roofMaterial)
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
        let result = await RoofMaterial.findOne({_id})
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

export const deleteRoofMaterial = async (req, res) => {
    const _id = req.params.id;
    if(!_id){
        return res.status(200).send({"error":"id is required!"})
    }

    try {
        const roofMaterial = await RoofMaterial.findByIdAndDelete({ _id: req.params.id })
        if (!roofMaterial) {
            return res.status(404).send('Not found')
        }
        await res.send(roofMaterial)
    } catch (error) {
        res.status(500).send(error)
    }
}