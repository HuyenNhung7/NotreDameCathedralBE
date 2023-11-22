import express from "express";
const router = express.Router();

import * as doorFaceController from "../controller/doorFaceController.js";

router.get("/api/doorFace", doorFaceController.getAllDoorFaces);
router.get("/api/doorFace/:id", doorFaceController.getDoorFaceById);

router.post("/api/doorFace", doorFaceController.addDoorFace);
router.put("/api/doorFace/:id", doorFaceController.updateDoorFace);
router.delete("/api/doorFace/:id", doorFaceController.deleteDoorFace);

export default router;
