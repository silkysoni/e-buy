// import express, { Router } from 'express';
import express from "express";
import { updateUser, updateUserPassword, registerUser, loginUser, getUserByJwt } from '../controllers/users.js'
import { verifyToken } from "../app.js";



const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.patch('/editinfo', verifyToken, updateUser)
router.patch('/updatepassword', verifyToken, updateUserPassword)
router.get('/getuser', verifyToken, getUserByJwt)

export default router;