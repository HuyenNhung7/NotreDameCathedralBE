import express from 'express'
import * as auth from '../middleware/auth.js'
const router=express.Router()
import * as accountController from '../controller/accountController.js'

router.get("/api/auth", accountController.getAllKH);
router.get("/api/auth/me", auth.auth, accountController.getMe);
router.get("/api/auth/:id", accountController.findById);
router.post("/api/auth", accountController.addKH);
router.put("/api/auth/:id", accountController.updateKH);
router.put("/api/auth/password/:id", accountController.ChangePassword);
router.post("/api/auth/login", accountController.login);
router.post("/api/auth/forgetpass", accountController.forgotPassword);
router.post("/api/auth/resetpass", accountController.resetPassword);
router.put("/api/auth/:id", accountController.updateKH);


export default router;


