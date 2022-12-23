import { Router } from "express";
import * as controllCLient from "../controllers/client"

const RouterClient = Router()

RouterClient.get('/client', controllCLient.getCLient)

export default RouterClient