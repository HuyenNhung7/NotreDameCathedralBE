import express from "express";
const router = express.Router();

import * as faceNodeController from  '../controller/faceNodeController.js'

router.get("/api/faceNode", faceNodeController.getAll)
router.get("/api/faceNode/:id", faceNodeController.get)
router.post("/api/faceNode", faceNodeController.add)
router.put("/api/faceNode/:id", faceNodeController.update)
router.delete("/api/faceNode/:id", faceNodeController.deleteFaceNode)


export default router