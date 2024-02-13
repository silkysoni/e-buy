import Products from "../models/productModel.js";


export const listProducts = async (req, res) => {
    try {
        const { title, category, price, description, location, quantity } = req.body;
        const userId = req.user.userId;
        const products = await Products({
            title: title,
            category: category,
            price: price,
            description: description,
            location: location,
            quantity: quantity,
            userId: userId,
            image: `http://localhost:3000/uploads/${req.file.filename}`
        })
        const savedProducts = await products.save();
        res.status(200).json(savedProducts);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error in listing products", error: error.message });
    }
}


export const displayProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).send(products)
    } catch (error) {
        res.status(500).json({ message: "Error in displaying products" });
    }
}

export const myListedItems = async (req, res) => {
    try {
        const userId = req.user.userId;
        const products = await Products.find({ userId: userId }).sort({ createdAt: -1 });
        console.log(products);
        if (products.length > 0) {
            res.status(200).json(products)
        }
        else {
            res.status(409).json({ message: "No listed products", listItem: false })
        }

    } catch (error) {
        res.status(500).json({ message: "error in displaying my items", error: error.message })
    }

}

