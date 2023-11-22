import express from "express";
const router = express.Router();

import * as roofdecorController from  '../controller/roofdecorController.js'

router.get("/api/roof-decor-all", roofdecorController.getAll)
router.get("/api/roof-decor/:id", roofdecorController.get)
router.post("/api/roof-decor-create", roofdecorController.add)
router.put("/api/roof-decor-update/:id", roofdecorController.update)
router.delete("/api/roof-decor-delete/:id", roofdecorController.deleteRoof)


export default router