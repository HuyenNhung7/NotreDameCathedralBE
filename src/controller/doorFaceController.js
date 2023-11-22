import DoorFace from "../models/doorFace.js";

export const getAllDoorFaces = async (req, res) => {
    try {
        const limit = parseInt(req.query.pageSize) || 10;
        const skip = (parseInt(req.query.page) - 1) * limit || 0;
        let filter = {};

        const listDoorFaces = await DoorFace.find(filter)
            .skip(skip)
            .limit(limit);
        const totalDoorFaces = (await DoorFace.find(filter)).length;
        const totalPages = Math.ceil(totalDoorFaces / limit);

        res.status(200).send({ listDoorFaces, totalDoorFaces });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getDoorFaceById = async (req, res) => {
    try {
        const doorFace = await DoorFace.findOne({ _id: req.params.id });
        if (!doorFace) {
            return res.status(404).send("Not found");
        }
        res.send(doorFace);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const addDoorFace = async (req, res) => {
    const doorFace = new DoorFace(req.body);
    try {
        await doorFace.save();
        res.status(201).send(doorFace);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const updateDoorFace = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ["idFace", "idDoor"];
    const isValidOperation = updates.every((update) => {
        return allowUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send("error: Invalid updates!");
    }
    try {
        const doorFace = await DoorFace.findOne({ _id: req.params.id });
        if (!doorFace) {
            return res.status(404).send("Not found");
        }
        updates.forEach((update) => {
            doorFace[update] = req.body[update];
        });
        await doorFace.save();
        res.send(doorFace);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteDoorFace = async (req, res) => {
    try {
        const doorFace = await DoorFace.findByIdAndDelete({
            _id: req.params.id,
        });
        if (!doorFace) {
            return res.status(404).send("Not found");
        }
        await res.send(doorFace);
    } catch (error) {
        res.status(500).send(error);
    }
};
