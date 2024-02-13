import Cart from "../models/cartModel.js";



export const addCartProducts = (async (req, res) => {
    try {
        const product = req.body.productId;
        const itemCount = req.body.itemCount;

        const userId = req.user.userId;
        const alreadyExist = await Cart.findOne({ userId, product });
        if (alreadyExist) {
            alreadyExist.itemCount++;
            const savedProducts = await alreadyExist.save();
            res.status(200).json(savedProducts);
        }
        else {
            const cartProducts = await Cart({
                product: product,
                userId: userId,
                itemCount: itemCount
            })
            const savedProducts = await cartProducts.save();
            res.status(200).json(savedProducts);
        }
    } catch (error) {
        res.status(500).json({ message: "Error in adding products to cart ", error: error.message });
    }
})

export const displayCartProducts = (async (req, res) => {
    try {
        const userId = req.user.userId;
        const dataEnteries = await Cart.find({ userId: userId }).populate('product').exec();
        res.status(200).json(dataEnteries);

    } catch (error) {
        res.status(500).json({ message: "error in displaying cart products", error: error.message });
    }
})

export const deleteCartProducts = (async (req, res) => {
    try {
        const userId = req.user.userId;
        const itemId = req.params.productId;

        const deletedProduct = await Cart.findOneAndDelete({ userId: userId, product: itemId });

        res.status(200).json({ message: 'Cart item removed successfully.', product: deletedProduct });

    } catch (error) {
        res.status(500).json({ message: "error in removing cart products", error: error.message });
    }
})

export const decreaseCartProducts = (async (req, res) => {
    try {
        const userId = req.user.userId;
        const itemId = req.params.productId;
        const item = await Cart.findOne({ userId: userId, product: itemId });
        console.log("item", item);

        item.itemCount--;
        await item.save();
        res.status(200).json({ message: "item count decreased", item });

    } catch (error) {
        res.status(500).json({ message: "error in decreasing cart products", error: error.message });
    }
})
export const increaseCartProducts = (async (req, res) => {
    try {
        const userId = req.user.userId;
        const itemId = req.params.productId;
        const item = await Cart.findOne({ userId: userId, product: itemId });
        console.log("item", item);

        item.itemCount++;
        await item.save();
        res.status(200).json({ message: "item count increased", item });

    } catch (error) {
        res.status(500).json({ message: "error in increasing cart products", error: error.message });
    };
});

export const deleteCart = async (req, res) => {
    try {
        const userId = req.user.userId;
        const cartDataToDelete = await Cart.find({ userId: userId });
        const cartData = await Cart.deleteMany({ userId });
        if (cartData.deletedCount > 0) {
            res.status(200).json(cartDataToDelete);
        } else {
            res.status(404).send('No carts found for the specified user.');
        }
    } catch (error) {
        res.status(500).json({ message: "internal error in deleting cart data", error: error.message })
    }
}