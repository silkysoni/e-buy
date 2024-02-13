import { mongoose } from "mongoose"

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    product: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products',
                required: true
            },
            title: {
                type: String,
                required: true
            },
            quantity: {
                type: String,
                required: true
            },
            price: {
                type: String,
                required: true
            }
        }
    ]
    ,
    totalPrice: {
        type: Number,
        required: true
    }

}
    , {
        timestamps: true
    })
const Order = new mongoose.model('Order', orderSchema);
export default Order;

