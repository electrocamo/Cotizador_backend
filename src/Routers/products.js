import { Router } from "express";
import * as controllproducts from "../controllers/products"

const RouterProducts = Router()

RouterProducts.post('/addproduct', controllproducts.postproduct)

RouterProducts.put('/editproduct', controllproducts.putEditProduct)

RouterProducts.get('/products', controllproducts.getproducts)

RouterProducts.delete('/borrarProducto', controllproducts.deleteProduct)


export default RouterProducts