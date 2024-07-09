import fs from 'fs';
import __dirname from '../../utils.js';

const PATH = `${__dirname}/db/products.json`;

class ProductsManagers {
	constructor() {
         this.init();
	}

	async init() {
		
		if (fs.existsSync(PATH)) {
			console.log('Ya existe el archivo products.json');
		} else {
			try {
			  await fs.promises.writeFile(PATH, JSON.stringify([]), 'utf-8')	
			} catch (error) {
				console.log('Error al crear el archivo', error);
                process.exit(1);
			}
		}
    };

	async getProducts() { 
		try {
			const data = await fs.promises.readFile(PATH, 'utf-8');
			return JSON.parse(data);
		} catch (error) {
			return null;
		}
	}

	async saveProducts(products){ 
		try {
			await fs.promises.writeFile(PATH, JSON.stringify(products,null,'\t'));
			return true;
		} catch (error) {
			console.log('Error al escribir el archivo', error);
			return false;
		}
	}

	async createProduct(product) {
		const products = await this.getProducts();

		if (!products) {
		   return -1;
		} 

        if (products.length === 0) {
		   product.pid = 1;
		} else {
			product.pid = products[products.length - 1].pid + 1;
		}
		products.push(product);

		const created = await this.saveProducts(products);

		if (!created) {
			return -1;
		}
		return created;
    }

	async getProductById(pid){
		const products = await this.getProducts();
		const productById = products.find((product) => product.pid === pid);

		  if(!productById) {
			  return -1 ;
		  } 
		return productById;
	};
	
    async deleteProduct(pid) {
	   const products = await this.getProducts(); 
	   const filteredProducts = products.filter((product) => product.pid != pid);  
	   const deleted = await this.saveProducts(filteredProducts); 

	   if (!deleted) {
		 return -1; 
	   }
	     return filteredProducts;
    };

    async updateProduct(pid, updateData) {
        const products = await this.getProducts();
        const productIndex = products.findIndex((product) => product.pid == pid);

        if (productIndex === -1) {
           return -1;
        }

        const updatedProduct = { ...products[productIndex], ...updateData, pid: products[productIndex].pid };
        products[productIndex] = updatedProduct;
        const updated = await this.saveProducts(products);

        if (!updated) {
          return -1;
        }
        return updatedProduct;
    };
};

export default ProductsManagers;  