import DoorMaterial from "../models/doorMaterial.js";

export const getAllDoorMaterials = async (req, res) => {
    try {
        const limit = parseInt(req.query.pageSize) || 10;
        const skip = (parseInt(req.query.page) - 1) * limit || 0;
        let filter = {};

        const listDoorMaterials = await DoorMaterial.find(filter)
            .skip(skip)
            .limit(limit);
        const totalDoorMaterials = (await DoorMaterial.find(filter)).length;
        const totalPages = Math.ceil(totalDoorMaterials / limit);

        res.status(200).send({ listDoorMaterials, totalDoorMaterials });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getDoorMaterialById = async (req, res) => {
    try {
        const doorMaterial = await DoorMaterial.findOne({ _id: req.params.id });
        if (!doorMaterial) {
            return res.status(404).send("Not found");
        }
        res.send(doorMaterial);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const addDoorMaterial = async (req, res) => {
    const doorMaterial = new DoorMaterial(req.body);
    try {
        await doorMaterial.save();
        res.status(201).send(doorMaterial);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const updateDoorMaterial = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ["idDoor", "idMaterial", "ageStartTime"];
    const isValidOperation = updates.every((update) => {
        return allowUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send("error: Invalid updates!");
    }
    try {
        const doorMaterial = await DoorMaterial.findOne({ _id: req.params.id });
        if (!doorMaterial) {
            return res.status(404).send("Not found");
        }
        updates.forEach((update) => {
            doorMaterial[update] = req.body[update];
        });
        await doorMaterial.save();
        res.send(doorMaterial);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteDoorMaterial = async (req, res) => {
    try {
        const doorMaterial = await DoorMaterial.findByIdAndDelete({
            _id: req.params.id,
        });
        if (!doorMaterial) {
            return res.status(404).send("Not found");
        }
        await res.send(doorMaterial);
    } catch (error) {
        res.status(500).send(error);
    }
};
