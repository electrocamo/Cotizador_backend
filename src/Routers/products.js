import { Router } from "express";
import * as controllproducts from "../controllers/products"

const RouterProducts = Router()

RouterProducts.post('/addproduct', controllproducts.postproduct)

RouterProducts.get('/products', controllproducts.getproducts)

export default RouterProducts