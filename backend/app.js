import express from "express";
const app = express();
import { mongoose } from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';
import userRoutes from './routes/user.js'
import orderRoutes from './routes/order.js'


app.use(cors());
app.use(express.json());
mongoose.set("strictQuery");
// app.use(bodyParser.json());
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/user", userRoutes);
app.use("/order", orderRoutes);
app.use('/uploads', express.static('uploads'));


mongoose.connect("mongodb+srv://silky12345soni:silkycloud123@cluster0.6mhvhhb.mongodb.net/ecommerce").then(() => {
    console.log("DB connected.");
}).catch((err) => {
    console.log("Error in connecting to DB.", err);
})
// export function verifyToken(req, res, next) {
//     const bearerHeader = req.headers['authorization'];
//     // console.log("headers", req.headers)
//     if (bearerHeader) {
//         const bearer = bearerHeader.split(" ");
//         const token = bearer[1];
//         // console.log("token", token)
//         req.user = jwt.verify(token, 'SECRET_KEY');

//         next();
//     }
//     else {
//         console.log("Invalid token");
//         res.send({
//             result: "Invalid token"
//         })
//     }
// }

export function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (bearerHeader) {
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];

        try {
            const decodedUser = jwt.verify(token, 'SECRET_KEY');
            req.user = decodedUser;
            next();
        } catch (error) {
            console.error("Token verification failed:", error);
            res.status(401).json({ error: "Invalid token" });
        }
    } else {
        console.log("Token not provided");
        res.status(401).json({ error: "Token not provided" });
    }
}
app.post('/tokencheck', verifyToken, (req, res) => {
    const user = req.user;
    console.log(user)
    res.status(200).json(user);
})


app.listen(3000, () => {
    console.log("Port : 3000");
})