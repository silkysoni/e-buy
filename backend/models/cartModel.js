import { mongoose } from "mongoose"

const cartSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    itemCount: {
        type: Number,
        default: 1
    }


}, {
    timestamps: true
})

const Cart = mongoose.model("Cart", cartSchema)
export default Cart