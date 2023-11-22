import express from "express";
const router = express.Router();

import * as walldecorController from  '../controller/walldecorController.js'

router.get("/api/wall-decor-all", walldecorController.getAll)
router.get("/api/wall-decor/:id", walldecorController.get)
router.post("/api/wall-decor-create", walldecorController.add)
router.put("/api/wall-decor-update/:id", walldecorController.update)
router.delete("/api/wall-decor-delete/:id", walldecorController.deleteWallDecor)


export default router