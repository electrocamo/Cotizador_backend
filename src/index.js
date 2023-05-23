import app from './app'
import { Express } from 'express'
import dotenv from 'dotenv'

dotenv.config()

app.listen(3200, () => {
    console.log(`Backend Cotizador PORT = 3200`)
  })