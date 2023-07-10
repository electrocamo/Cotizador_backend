import express  from "express";
import morgan from "morgan"
import cors from "cors"
import RouterClient from "./routers/client";
import Routerquotes from "./routers/quotes";
import RouterProducts from "./routers/products";
import Routerusers from "./routers/users";
import { urlarchivos } from "./Config";

const app = express() 

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(RouterClient)
app.use(Routerquotes)
app.use(RouterProducts)  
app.use(Routerusers)

app.use("/Image", express.static(urlarchivos))

export default app