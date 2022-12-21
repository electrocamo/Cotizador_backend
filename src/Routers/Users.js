import { Router } from "express";
import * as controllusers from "../controllers/users"

const Routerusers = Router()

Routerusers.post('/Register', controllusers.Register)
Routerusers.post('/Login', controllusers.Login)

export default Routerusers