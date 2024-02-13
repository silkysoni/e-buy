import express from 'express';
import { verifyToken } from "../app.js";
import { placeOrder, allorders } from '../controllers/orders.js'

const router = express.Router()

router.post('/placeorder', verifyToken, placeOrder)

router.get('/allitems', verifyToken, allorders)

export default router