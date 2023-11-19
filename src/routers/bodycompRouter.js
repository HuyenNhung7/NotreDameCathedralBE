import express from "express";
const router = express.Router();
import * as bodycompController from '../controller/bodycompController.js'

router.get("/api/bodycomp", bodycompController.getAllBodyComp)
router.get("/api/bodyComp/path", bodycompController.getBodyCompByPath)
router.get("/api/bodyComp/path/all", bodycompController.getAllPath)
router.post("/api/bodycomp", bodycompController.addBodyComp)
router.delete("/api/bodyComp/path", bodycompController.deleteBodyCompByPath)

export default router;