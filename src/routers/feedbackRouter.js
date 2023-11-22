import express from "express";
const router = express.Router();

import * as feedbackController from  '../controller/feedbackController.js'

router.get("/api/feedback", feedbackController.getAll)
router.get("/api/feedback/:id", feedbackController.get)
router.post("/api/feedback", feedbackController.add)
router.put("/api/feedback/:id", feedbackController.update)
router.delete("/api/feedback/:id", feedbackController.deleteFeedback)


export default router