import { Router } from "express";
import {productsService} from "../managers/index.js";

const router = Router();

router.get("/", async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 4;
	const sort = req.query.sort || "asc";

	const productsPaginate = await productsService.getProducts(page, limit, sort);
	const products = productsPaginate.docs;
	const {hasPrevPage, hasNextPage, prevPage,nextPage, page:currentPage} = productsPaginate;
	console.log(productsPaginate)

	if (!products) {
		return res.render('404')
	}

	res.render("Home", { 
		products, 
		page: currentPage,
		hasPrevPage, 
		hasNextPage,
		prevPage,
		nextPage	
	});
});

router.get("/realtimeproducts", async (req, res) => {
	res.render("realTimeProducts")
});

export default router;