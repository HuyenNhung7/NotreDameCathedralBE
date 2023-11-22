import express from "express";
const router = express.Router();

import * as floorMaterialController from  '../controller/floorMaterialController.js'

router.get("/api/floorMaterial", floorMaterialController.getAll)
router.get("/api/floorMaterial/:id", floorMaterialController.get)
router.post("/api/floorMaterial", floorMaterialController.add)
router.put("/api/floorMaterial/:id", floorMaterialController.update)
router.delete("/api/floorMaterial/:id", floorMaterialController.deleteFloorMaterial)


export default router