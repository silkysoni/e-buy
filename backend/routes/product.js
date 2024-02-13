import express from "express";
import { verifyToken } from "../app.js";
import { listProducts, displayProducts, myListedItems } from "../controllers/products.js";


import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/listproduct', verifyToken, upload.single('image'), listProducts);
router.get('/', displayProducts);
router.get('/mylisteditems', verifyToken, myListedItems)

export default router;