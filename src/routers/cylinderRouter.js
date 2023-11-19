import express from "express";
const router = express.Router();
import * as cylinderController from '../controller/cylinderController.js'

router.get("/api/cylinder", cylinderController.getAllCylinder)
router.get("/api/cylinder/path", cylinderController.getcylinderByPath)
router.get("/api/cylinder/path/all", cylinderController.getAllPath)
router.post("/api/cylinder", cylinderController.addCylinder)
router.delete("/api/cylinder/path", cylinderController.getcylinderByPath)

export default router;