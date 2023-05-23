import { Router } from "express";
import * as controllusers from "../controllers/users"

const Routerusers = Router()

Routerusers.post('/Register', controllusers.Register)
Routerusers.post('/Login', controllusers.Login)

Routerusers.get('/users', controllusers.getUsers)

Routerusers.put('/editUsers', controllusers.putUsers)

Routerusers.delete('/borrarUsers', controllusers.deleteUsers)

export default Routerusers