import { Router } from "express";
import * as controllquotes from "../controllers/quotes"
import multer from 'multer'

const Routerquotes = Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {   
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      console.log('Archivo:', file)
      cb(null, file.originalname)
    } 
  })
  var upload = multer({ storage: storage });

Routerquotes.post('/Uploadfile', upload.array('file', [10]), controllquotes.Uploadfile)

Routerquotes.post('/addquotes', controllquotes.postQuotes)
Routerquotes.post('/addquotesandclien', controllquotes.postQuotesaddCLient)
Routerquotes.post('/addhistoryProduct', controllquotes.posthistoryproduct)

Routerquotes.get('/quotes', controllquotes.getquotes)
Routerquotes.get('/historyproduct', controllquotes.gethistoryproduct)

Routerquotes.put('/editQuotes', controllquotes.putQuotes)

Routerquotes.delete('/Borrar-quotes', controllquotes.deleteimage)

export default Routerquotes
