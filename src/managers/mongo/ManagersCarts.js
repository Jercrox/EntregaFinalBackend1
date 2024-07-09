import cartModel from './models/cart.model.js';

export default class ManagersCarts {
	
	getCarts( opts={}) { 
        return cartModel.find( opts ).lean(); // Busca todos
	}

    getCartById (cid) {
		return cartModel.findOne( {_id: cid}).lean(); // Busca solo uno
	};

    createCart() {
        const newCart = new cartModel({ products: [] });
        return newCart.save();
    }

    // Método para agregar un producto al carrito seleccionado
    addProductToCart(cid, product) {
        return cartModel.findOneAndUpdate(
            { _id: String(cid), "products.product": product.product },
            { $inc: { "products.$.quantity": product.quantity } },
            { new: true }
        );
    };

    //Metodo elimina un product del carrito
    deleteProductCart(cid, pid) {
        return cartModel.updateOne(
            { _id: String(cid) },
            { $pull: { products: { _id: pid } } }
        );
    };

    // Método deleteCard, no limina el carrito
    deleteAllProductsCid(cid) {
        return cartModel.updateOne(
            { _id: String(cid) },
            { $set: { products: [] } }
        );
    };

// Metodo para actualizar todos los productos
    updateCart(cid, products) {
        return cartModel.updateOne(
            { _id: String(cid) },
            { $set: { products: products } }
        );
    };

// Metodo para actualizar la cantidad del producto
    updateProductQuantity(cid, pid, quantity) {
        return cartModel.updateOne(
            { _id: String(cid), "products.product": pid },
            { $set: { "products.$.quantity": quantity } }
        );
    };
};


  