import fs from 'fs';
import __dirname from '../../utils.js';

const PATH = `${__dirname}/db/carts.json`;

class CartsManagers {
	constructor() {
         this.init();
	}

	async init() {
		
		if (fs.existsSync(PATH)) {
			console.log('Ya existe el archivo Carts.json');
		} else {

			try {
				await fs.promises.writeFile(PATH, JSON.stringify([]), 'utf-8')
				
			} catch (error) {

				console.log('Error al crear el archivo', error);

                process.exit(1);
			}
		}
    };

	async getCarts() { 
		try {
			const data = await fs.promises.readFile(PATH, 'utf-8');
			return JSON.parse(data);
		} catch (error) {
			return null;
		}
	}

	async saveCarts(carts){
		try {
			await fs.promises.writeFile(PATH, JSON.stringify(carts,null,'\t'));
			return true;
		} catch (error) {
			console.log('Error al escribir el archivo', error);
			return false;
		}
	}

	async createCart({ products= [] }) {
		
		const newCart = {
			products
		}
				    
		const carts = await this.getCarts();

		if (!carts) {
		   return -1;
		} 

        if (carts.length === 0) {
	      newCart.cid = 1;
		} else {
          newCart.cid = carts[carts.length - 1].cid + 1;
		}
		carts.push(newCart);

		const created = await this.saveCarts(carts);

		if (!created) {
			return -1;
		}
		return newCart.cid;
    }


    async deleteCart(cid) {

	   const carts = await this.getCarts(); 
	   const filteredCarts = carts.filter((cart) => cart.cid != cid);  
	   const deleted = await this.saveCarts(filteredCarts); 

	   if (!deleted) {
		 return -1; 
	   }
	     return filteredCarts;
    };

    async updateCart(cid, updateData) {

        const carts = await this.getCarts(); 
        const cartIndex = carts.findIndex((cart) => cart.cid == cid); 

        if (cartIndex === -1) {
           return -1;
        }

        const updatedCart = { ...carts[cartIndex], ...updateData, cid: carts[cartIndex].cid };
        carts[cartIndex] = updatedCart;

        const updated = await this.saveCarts(carts);

        if (!updated) {
          return -1;
        }

        return updatedCart;
    };
};


export default CartsManagers;  