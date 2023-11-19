import express from "express";
const router = express.Router();

import * as faceController from "../controller/faceController.js"

router.get("/api/face/path", faceController.getFace)
router.post("/api/face", faceController.addFace)
router.delete("/api/face/:id", faceController.deleteFaceById)
export default router;