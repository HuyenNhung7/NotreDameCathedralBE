import RoofDecorMaterial from "../models/roofDecorMaterial.js";

export const getAll = async (req, res) => {
    try {
        let result = await RoofDecorMaterial.find()
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

        let result = await RoofDecorMaterial.find({_id})
        if(!result){
            return res.status(404).send("Not found")
        }

        res.status(200).send(result)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

const checkDate = (date) =>{
    if (!date) return false;

    const d = date.slice(0, 2);
    const m = date.slice(3, 5);
    const y = date.slice(6, 10);

    return /^\d{2}\/\d{2}\/\d{4}$/.test(date) &&
        y >= 1000 && y <= 9999 &&
        m >= 1 && m <= 12 &&
        d >= 1 && d <= 31;
}

export const add = async (req, res) => {
    if(!checkDate(req.body.ageStartTime)){
        return res.status(200).send({"error":"date is not valid"})
    }

    try {
        const wall = new RoofDecorMaterial(req.body);
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

    if(!checkDate(req.body.ageStartTime)){
        return res.status(200).send({"error":"date is not valid"})
    }
    
    const updates = Object.keys(req.body)
    try {
        let result = await RoofDecorMaterial.findOne({_id})
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

export const deleteRoofDecorMaterial = async (req, res) => {
    const _id = req.params.id;
    if(!_id){
        return res.status(200).send({"error":"id is required!"})
    }

    try {
        const wall = await RoofDecorMaterial.findByIdAndDelete({ _id: req.params.id })
        if (!wall) {
            return res.status(404).send('Not found')
        }
        await res.send(wall)
    } catch (error) {
        res.status(500).send(error)
    }
}