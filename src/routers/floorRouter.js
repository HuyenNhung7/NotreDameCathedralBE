import express from "express";
const router = express.Router();

import * as floorController from  '../controller/floorController.js'

router.get("/api/floor", floorController.getAll)
router.get("/api/floor/:id", floorController.get)
router.post("/api/floor", floorController.add)
router.put("/api/floor/:id", floorController.update)
router.delete("/api/floor/:id", floorController.deleteFloor)


export default router