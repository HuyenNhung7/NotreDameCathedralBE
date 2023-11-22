import express from "express";
const router = express.Router();

import * as wallController from  '../controller/wallController.js'

router.get("/api/wall-all", wallController.getAll)
router.get("/api/wall/:id", wallController.get)
router.post("/api/wall-create", wallController.add)
router.put("/api/wall-update/:id", wallController.update)
router.delete("/api/wall-delete/:id", wallController.deleteWall)


export default router