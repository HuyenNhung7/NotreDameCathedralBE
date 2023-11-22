import express from "express";
const router = express.Router();

import * as entityRepairStatusController from "../controller/entityRepairStatusController.js";

router.get("/api/entityRepairStatus", entityRepairStatusController.getAllEntityRepairStatus);
router.get("/api/entityRepairStatus/:id", entityRepairStatusController.getEntityRepairStatusById);

router.post("/api/entityRepairStatus", entityRepairStatusController.addEntityRepairStatus);
router.put("/api/entityRepairStatus/:id", entityRepairStatusController.updateEntityRepairStatus);
router.delete("/api/entityRepairStatus/:id", entityRepairStatusController.deleteEntityRepairStatus);

export default router;
