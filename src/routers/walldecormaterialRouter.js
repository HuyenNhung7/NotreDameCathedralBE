import express from "express";
const router = express.Router();

import * as walldecormaterialController from  '../controller/walldecormaterialController.js'

router.get("/api/wall-decor-material-all", walldecormaterialController.getAll)
router.get("/api/wall-decor-material/:id", walldecormaterialController.get)
router.post("/api/wall-decor-material-create", walldecormaterialController.add)
router.put("/api/wall-decor-material-update/:id", walldecormaterialController.update)
router.delete("/api/wall-decor-material-delete/:id", walldecormaterialController.deleteWallDecorMaterial)


export default router