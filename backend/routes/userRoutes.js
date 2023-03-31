import express from "express";
import { get } from "mongoose";
const router = express.Router();

import { authUser, getUserProfile, registerUser } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', authUser)
router.post('/', registerUser)
router.route('/profile').get(protect, getUserProfile)

export default router;
