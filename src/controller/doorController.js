import Door from "../models/door.js";

export const getAllDoors = async (req, res) => {
    try {
        const limit = parseInt(req.query.pageSize) || 10;
        const skip = (parseInt(req.query.page) - 1) * limit || 0;
        let filter = {};

        const listDoors = await Door.find(filter).skip(skip).limit(limit);
        const totalDoors = (await Door.find(filter)).length;
        const totalPages = Math.ceil(totalDoors / limit);

        res.status(200).send({ listDoors, totalDoors });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getDoorById = async (req, res) => {
    try {
        const door = await Door.findOne({ _id: req.params.id });
        if (!door) {
            return res.status(404).send("Not found");
        }
        res.send(door);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const addDoors = async (req, res) => {
    const door = new Door(req.body);
    try {
        await door.save();
        res.status(201).send(door);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const updateDoor = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ["name", "description", "width", "height", "color"];
    const isValidOperation = updates.every((update) => {
        return allowUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send("error: Invalid updates!");
    }
    try {
        const door = await Door.findOne({ _id: req.params.id });
        if (!door) {
            return res.status(404).send("Not found");
        }
        updates.forEach((update) => {
            door[update] = req.body[update];
        });
        await door.save();
        res.send(door);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteDoor = async (req, res) => {
    try {
        const door = await Door.findByIdAndDelete({
            _id: req.params.id,
        });
        if (!door) {
            return res.status(404).send("Not found");
        }
        await res.send(door);
    } catch (error) {
        res.status(500).send(error);
    }
};
