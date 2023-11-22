import express from "express";
const router = express.Router();

import * as roofdecormaterialController from  '../controller/roofdecormaterialController.js'

router.get("/api/roof-decor-material-all", roofdecormaterialController.getAll)
router.get("/api/roof-decor-material/:id", roofdecormaterialController.get)
router.post("/api/roof-decor-material-create", roofdecormaterialController.add)
router.put("/api/roof-decor-material-update/:id", roofdecormaterialController.update)
router.delete("/api/roof-decor-material-delete/:id", roofdecormaterialController.deleteRoofDecorMaterial)

export default router