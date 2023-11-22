import WindowMaterial from "../models/windowMaterial.js";

export const getAllWindowMaterials = async (req, res) => {
    try {
        const limit = parseInt(req.query.pageSize) || 10;
        const skip = (parseInt(req.query.page) - 1) * limit || 0;
        let filter = {};

        const listWindowMaterials = await WindowMaterial.find(filter)
            .skip(skip)
            .limit(limit);
        const totalWindowMaterials = (await WindowMaterial.find(filter)).length;
        const totalPages = Math.ceil(totalWindowMaterials / limit);

        res.status(200).send({ listWindowMaterials, totalWindowMaterials });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getWindowMaterialById = async (req, res) => {
    try {
        const windowMaterial = await WindowMaterial.findOne({
            _id: req.params.id,
        });
        if (!windowMaterial) {
            return res.status(404).send("Not found");
        }
        res.send(windowMaterial);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const addWindowMaterial = async (req, res) => {
    const windowMaterial = new WindowMaterial(req.body);
    try {
        await windowMaterial.save();
        res.status(201).send(windowMaterial);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const updateWindowMaterial = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ["idWindow", "idMaterial", "ageStartTime"];
    const isValidOperation = updates.every((update) => {
        return allowUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send("error: Invalid updates!");
    }
    try {
        const windowMaterial = await WindowMaterial.findOne({
            _id: req.params.id,
        });
        if (!windowMaterial) {
            return res.status(404).send("Not found");
        }
        updates.forEach((update) => {
            windowMaterial[update] = req.body[update];
        });
        await windowMaterial.save();
        res.send(windowMaterial);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteWindowMaterial = async (req, res) => {
    try {
        const windowMaterial = await WindowMaterial.findByIdAndDelete({
            _id: req.params.id,
        });
        if (!windowMaterial) {
            return res.status(404).send("Not found");
        }
        await res.send(windowMaterial);
    } catch (error) {
        res.status(500).send(error);
    }
};
