import express from "express";
const router = express.Router();

import * as roofController from  '../controller/roofController.js'

router.get("/api/roof", roofController.getAll)
router.get("/api/roof/:id", roofController.get)
router.post("/api/roof", roofController.add)
router.put("/api/roof/:id", roofController.update)
router.delete("/api/roof/:id", roofController.deleteRoof)


export default router