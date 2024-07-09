import productModel from './models/product.model.js';

export default class ManagersProducts {
	
    getProducts(page, limit, sort, maxPrice, category, stock) {
        const filter = {};

        if (maxPrice) {
            filter.price = { $lte: maxPrice }; 
        }
        if (category) {
            filter.category = category;
        }
        if (stock) {
            filter.stock = { $gte: stock };
        }

        if (sort === 'asc' || sort === 'desc') {
            return productModel.paginate(filter, { limit, page, lean: true, sort: { price: sort } }); // Ordenar por precio
        } else {
            return productModel.paginate(filter, { limit, page, lean: true }); // Sin ordenamiento si sort no es válido
        }
    };

    getProductsViews() {
        return productModel.find({}).lean();
    };

	getProductById (pid) { // Busca solo uno
		return productModel.findOne( {_id: (pid)}); 
	};
 
    createProduct(product){ // Crea uno nuevo
        return productModel.create(product);
    };

    updateProduct(pid, updateData){ // edita uno
        return productModel.updateOne({ _id: String(pid) }, { $set: updateData });
    };
 
    deleteProduct(pid){ // elimina uno
        return productModel.deleteOne({_id:pid});
    };	
};

