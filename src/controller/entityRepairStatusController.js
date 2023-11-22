import EntityRepairStatus from "../models/entityRepairStatus.js";

export const getAllEntityRepairStatus = async (req, res) => {
    try {
        const limit = parseInt(req.query.pageSize) || 10;
        const skip = (parseInt(req.query.page) - 1) * limit || 0;
        let filter = {};

        const listEntityRepairStatus = await EntityRepairStatus.find(filter)
            .skip(skip)
            .limit(limit);
        const totalEntityRepairStatus = (await EntityRepairStatus.find(filter))
            .length;
        const totalPages = Math.ceil(totalEntityRepairStatus / limit);

        res.status(200).send({
            listEntityRepairStatus,
            totalEntityRepairStatus,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getEntityRepairStatusById = async (req, res) => {
    try {
        const entityRepairStatus = await EntityRepairStatus.findOne({
            _id: req.params.id,
        });
        if (!entityRepairStatus) {
            return res.status(404).send("Not found");
        }
        res.send(entityRepairStatus);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const addEntityRepairStatus = async (req, res) => {
    const entityRepairStatus = new EntityRepairStatus(req.body);
    try {
        await entityRepairStatus.save();
        res.status(201).send(entityRepairStatus);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const updateEntityRepairStatus = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = [
        "startDate",
        "finishDate",
        "type",
        "repairReason",
        "idEntity",
        "idAccount",
    ];
    const isValidOperation = updates.every((update) => {
        return allowUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send("error: Invalid updates!");
    }
    try {
        const entityRepairStatus = await EntityRepairStatus.findOne({
            _id: req.params.id,
        });
        if (!entityRepairStatus) {
            return res.status(404).send("Not found");
        }
        updates.forEach((update) => {
            entityRepairStatus[update] = req.body[update];
        });
        await entityRepairStatus.save();
        res.send(entityRepairStatus);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteEntityRepairStatus = async (req, res) => {
    try {
        const entityRepairStatus = await EntityRepairStatus.findByIdAndDelete({
            _id: req.params.id,
        });
        if (!entityRepairStatus) {
            return res.status(404).send("Not found");
        }
        await res.send(entityRepairStatus);
    } catch (error) {
        res.status(500).send(error);
    }
};
