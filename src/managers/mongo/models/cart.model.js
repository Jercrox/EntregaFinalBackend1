import mongoose from 'mongoose';

const collection = "Carts"

const schema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Products', // Referencia al modelo de productos
                required: true,
                unique: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ]   
});

schema.pre(['find','findOne'], function(){
    this.populate('products.product')
})

const cartModel = mongoose.model(collection,schema);

export default cartModel;