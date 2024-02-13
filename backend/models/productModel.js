import { mongoose } from 'mongoose';

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
},
    {
        timeStamps: true
    }
)
const Products = mongoose.model("Products", productSchema)
export default Products