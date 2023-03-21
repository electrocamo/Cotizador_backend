import { Router } from "express";
import * as controllCLient from "../controllers/client"

const RouterClient = Router()

RouterClient.post('/addClient', controllCLient.postClient)

RouterClient.put('/editClient', controllCLient.putEditClient)

RouterClient.delete('/deleteClient', controllCLient.deleteCliente)

RouterClient.get('/client', controllCLient.getCLient)

export default RouterClient