import express from "express";
const router = express.Router();

import * as doorMaterialController from "../controller/doorMaterialController.js";

router.get("/api/doorMaterial", doorMaterialController.getAllDoorMaterials);
router.get("/api/doorMaterial/:id", doorMaterialController.getDoorMaterialById);

router.post("/api/doorMaterial", doorMaterialController.addDoorMaterial);
router.put("/api/doorMaterial/:id", doorMaterialController.updateDoorMaterial);
router.delete(
    "/api/doorMaterial/:id",
    doorMaterialController.deleteDoorMaterial
);

export default router;
