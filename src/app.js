import express  from "express";
import morgan from "morgan"
import cors from "cors"
import Routerusers from "./Routers/Users";
import Routercustomers from "./Routers/Customers";
import Routerquotes from "./Routers/Quotes";

const app = express() 

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(Routerusers)
app.use(Routercustomers)
app.use(Routerquotes)

export default app