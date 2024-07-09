import ManagersProducts from "./mongo/ManagersProducts.js";
import ManagersCarts from "./mongo/ManagersCarts.js";
export const productsService = new ManagersProducts();
export const cartsService = new ManagersCarts();