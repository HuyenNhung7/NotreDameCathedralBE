import express from 'express'
import * as auth from '../middleware/auth.js'
const router=express.Router()
import * as khachhangController from '../controller/khachhangController.js'

router.get("/api/auth", khachhangController.getAllKH);
router.get("/api/auth/me", auth.auth, khachhangController.getMe);
router.get("/api/auth/:id", khachhangController.findById);
router.post("/api/auth", khachhangController.addKH);
router.put("/api/auth/:id", khachhangController.updateKH);
router.put("/api/auth/password/:id", khachhangController.ChangePassword);
router.post("/api/auth/login", khachhangController.login);
router.post("/api/auth/forgetpass", khachhangController.forgotPassword);
router.post("/api/auth/resetpass", khachhangController.resetPassword);
router.put("/api/auth/:id", khachhangController.updateKH);


export default router;


