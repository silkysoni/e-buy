import Cart from "../models/cartModel.js";
import Order from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
    try {
        const userId = req.user.userId;
        const cartItems = await Cart.find({ userId: userId }).populate('product').exec();

        const totalPrice = cartItems.reduce((accu, currVal) => {
            const numPrice = Number(currVal.product.price);
            return accu + numPrice * currVal.itemCount;
        }, 0);

        const productsForOrder = cartItems.map(cartItem => ({
            productId: cartItem.product._id,
            title: cartItem.product.title,
            quantity: cartItem.itemCount,
            price: cartItem.product.price
        }));

        const purchasedProducts = new Order({
            userId: userId,
            product: productsForOrder,
            totalPrice: totalPrice
        });


        const savedOrder = await purchasedProducts.save();
        if (savedOrder) {
            res.status(200).json(savedOrder);
        } else {
            res.status(500).json({ message: "Error in adding purchased products", error: "Saved order is undefined" });
        }

    } catch (error) {
        res.status(500).json({ message: "Error in adding purchased products ", error: error.message })
    }
}
// .sort({ createdAt: -1 });

export const allorders = async (req, res) => {
    try {
        const userId = req.user.userId;
        const allPurchasedData = await Order.find({ userId: userId })

        console.log(allPurchasedData);
        res.status(200).json(allPurchasedData);

    } catch (error) {
        res.status(500).json({ message: "Internal error in displaying purchase history", error: error.message })
    }
}

