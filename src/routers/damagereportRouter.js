import express from "express";
const router = express.Router();

import * as damagereportController from  '../controller/damagereportController.js'

router.get("/api/damage-report-all", damagereportController.getAll)
router.get("/api/damage-report/:id", damagereportController.get)
router.post("/api/damage-report-create", damagereportController.add)
router.put("/api/damage-report-update/:id", damagereportController.update)
router.delete("/api/damage-report-delete/:id", damagereportController.deleteDamageReport)


export default router