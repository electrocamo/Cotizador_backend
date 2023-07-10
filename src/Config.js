import {config as dotenv} from "dotenv"

dotenv()

export const config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
}

 export const urlarchivos = 'C:/Users/Janus/Desktop/Cordoblez/Cotizador_backend/uploads'
//export const urlarchivos = '/Users/adrian/Desktop/Ander/PROYECTOS/BackendCotizador'
