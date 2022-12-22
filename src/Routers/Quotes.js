import { Router } from "express";
import * as controllquotes from "../controllers/Quotes"

const Routerquotes = Router()

Routerquotes.get('/quotes', controllquotes.getquotes)

export default Routerquotes