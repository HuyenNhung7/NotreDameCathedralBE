import express from "express";
const router = express.Router();

import * as roofMaterialController from  '../controller/roofMaterialController.js'

router.get("/api/roofMaterial", roofMaterialController.getAll)
router.get("/api/roofMaterial/:id", roofMaterialController.get)
router.post("/api/roofMaterial", roofMaterialController.add)
router.put("/api/roofMaterial/:id", roofMaterialController.update)
router.delete("/api/roofMaterial/:id", roofMaterialController.deleteRoofMaterial)


export default router