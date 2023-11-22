import express from "express";
const router = express.Router();

import * as windowMaterialController from "../controller/windowMaterialController.js";

router.get(
    "/api/windowMaterial",
    windowMaterialController.getAllWindowMaterials
);
router.get(
    "/api/windowMaterial/:id",
    windowMaterialController.getWindowMaterialById
);

router.post("/api/windowMaterial", windowMaterialController.addWindowMaterial);
router.put(
    "/api/windowMaterial/:id",
    windowMaterialController.updateWindowMaterial
);
router.delete(
    "/api/windowMaterial/:id",
    windowMaterialController.deleteWindowMaterial
);

export default router;
