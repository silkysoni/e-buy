import express from "express";
import { verifyToken } from "../app.js";
import { addCartProducts, displayCartProducts, deleteCartProducts, decreaseCartProducts, increaseCartProducts, deleteCart, } from "../controllers/carts.js";

const router = express.Router();

router.post('/additem', verifyToken, addCartProducts);
router.get('/displayitems', verifyToken, displayCartProducts)
router.delete('/deleteitem/:productId', verifyToken, deleteCartProducts)
router.patch('/decreaseitem/:productId', verifyToken, decreaseCartProducts)
router.patch('/increaseitem/:productId', verifyToken, increaseCartProducts)
router.delete('/deletecart', verifyToken, deleteCart)

export default router;