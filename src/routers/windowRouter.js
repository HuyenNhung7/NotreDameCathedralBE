import express from "express";
const router = express.Router();

import * as windowController from "../controller/windowController.js";

router.get("/api/window", windowController.getAllWindows);
router.get("/api/window/:id", windowController.getWindowById);

router.post("/api/window", windowController.addWindows);
router.put("/api/window/:id", windowController.updateWindow);
router.delete("/api/window/:id", windowController.deleteWindow);

export default router;
