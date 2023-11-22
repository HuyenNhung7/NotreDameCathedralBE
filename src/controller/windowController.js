import Window from "../models/window.js";

export const getAllWindows = async (req, res) => {
    try {
        const limit = parseInt(req.query.pageSize) || 10;
        const skip = (parseInt(req.query.page) - 1) * limit || 0;
        let filter = {};

        const listWindows = await Window.find(filter).skip(skip).limit(limit);
        const totalWindows = (await Window.find(filter)).length;
        const totalPages = Math.ceil(totalWindows / limit);

        res.status(200).send({ listWindows, totalWindows });
    } catch (error) {
        res.status(500).send(error);
    }
};

export const getWindowById = async (req, res) => {
    try {
        const window = await Window.findOne({ _id: req.params.id });
        if (!window) {
            return res.status(404).send("Not found");
        }
        res.send(window);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const addWindows = async (req, res) => {
    const window = new Window(req.body);
    try {
        await window.save();
        res.status(201).send(window);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

export const updateWindow = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = [
        "name",
        "description",
        "width",
        "height",
        "color",
        "radius",
        "idHalfCircle",
        "idFace",
    ];
    const isValidOperation = updates.every((update) => {
        return allowUpdates.includes(update);
    });
    if (!isValidOperation) {
        return res.status(400).send("error: Invalid updates!");
    }
    try {
        const window = await Window.findOne({ _id: req.params.id });
        if (!window) {
            return res.status(404).send("Not found");
        }
        updates.forEach((update) => {
            window[update] = req.body[update];
        });
        await window.save();
        res.send(window);
    } catch (error) {
        res.status(500).send(error);
    }
};

export const deleteWindow = async (req, res) => {
    try {
        const window = await Window.findByIdAndDelete({
            _id: req.params.id,
        });
        if (!window) {
            return res.status(404).send("Not found");
        }
        await res.send(window);
    } catch (error) {
        res.status(500).send(error);
    }
};
