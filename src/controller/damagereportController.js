import DamageReport from '../models/damageReport.js'
import mongoose from "mongoose";

export const getAll = async (req, res) => {
    try {
        let results = await DamageReport.aggregate([
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'id_account',
                    foreignField: '_id',
                    as: 'accountInfo'
                }
            },
            {
                $unwind: '$accountInfo'
            }
        ]).exec();

        res.status(200).send(results)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}

export const get = async (req, res) => {
    const _id = req.params.id;
    if(!_id){
        return res.status(200).send({"error":"id is required!"})
    }

    try {
        //let result = await DamageReport.findOne({_id})
        let result = await DamageReport.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(_id) }
            },
            {
                $lookup: {
                    from: 'accounts',
                    localField: 'id_account',
                    foreignField: '_id',
                    as: 'accountInfo'
                }
            },
            {
                $unwind: '$accountInfo'
            }
        ]).exec();
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
    if(!checkDate(req.body.date)){
        return res.status(200).send({"error":"date is not valid"})
    }

    try {
        const damageReport = new DamageReport(req.body);
        await damageReport.save()

        res.status(201).send(damageReport)
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

    if(!checkDate(req.body.date)){
        return res.status(200).send({"error":"date is not valid"})
    }
    
    const updates = Object.keys(req.body)
    try {
        let result = await DamageReport.findOne({_id})
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

export const deleteDamageReport = async (req, res) => {
    const _id = req.params.id;
    if(!_id){
        return res.status(200).send({"error":"id is required!"})
    }

    try {
        const wall = await DamageReport.findByIdAndDelete({ _id: req.params.id })
        if (!wall) {
            return res.status(404).send('Not found')
        }
        await res.send(wall)
    } catch (error) {
        res.status(500).send(error)
    }
}