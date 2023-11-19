import express from "express";
const router = express.Router();

import * as nodeController from "../controller/nodeController.js"

router.get("/api/node", nodeController.getAllNodes)
router.post("/api/node", nodeController.addManyNodes)

export default router