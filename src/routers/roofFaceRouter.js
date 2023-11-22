import express from "express";
const router = express.Router();

import * as roofFaceController from  '../controller/roofFaceController.js'

router.get("/api/roofFace", roofFaceController.getAll)
router.get("/api/roofFace/:id", roofFaceController.get)
router.post("/api/roofFace", roofFaceController.add)
router.put("/api/roofFace/:id", roofFaceController.update)
router.delete("/api/roofFace/:id", roofFaceController.deleteRoofFace)


export default router