import express from "express";
const router = express.Router();

import * as doorController from "../controller/doorController.js";

router.get("/api/door", doorController.getAllDoors);
router.get("/api/door/:id", doorController.getDoorById);

router.post("/api/door", doorController.addDoors);
router.put("/api/door/:id", doorController.updateDoor);
router.delete("/api/door/:id", doorController.deleteDoor);

export default router;
