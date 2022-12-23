import express  from "express";
import morgan from "morgan"
import cors from "cors"
import Routerusers from "./Routers/Users";
import RouterClient from "./Routers/Client";
import Routerquotes from "./Routers/Quotes";

const app = express() 

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(Routerusers)
app.use(RouterClient)
app.use(Routerquotes)

export default app