import { connect } from '../../db/database'
import { rm } from 'fs/promises';

export const getquotes = async (req, res)=>{
    try { 
        const db = await connect()
        const [response] = await db.query("SELECT * FROM cotizaciones")
        response.map((item)=>{
            var deliveryDate = '' + item.fecha
            deliveryDate = deliveryDate.split('T')[0];
            console.log("data: ", deliveryDate);
        })
        console.log(response)
        res.json(response)
        db.end()
    } catch (error) {
        console.log(error)
    }
}


export const gethistoryproduct = async (req, res)=>{
    try { 
        const db = await connect()
        const [response] = await db.query("SELECT * FROM historialproductos")
        console.log(response)
        res.json(response)
        db.end()
    } catch (error) {
        console.log(error)
    }
}

export const postQuotesaddCLient = async (req, res) =>{
    try {
        console.log('Estamos intentando crear una nueva cotizacion con cliente nuevo')
        const {date, seller, citizenshipCard, direction, contact, phone, client, payment, email, youMay, invoiceNumber, image, priceEnd, itemEnd} = req.body
            const db = await connect()
            await db.query("INSERT INTO cotizaciones(fechaentrega, asesor, nitocc, direccion, contacto, telefono, cliente, debe, correo, abono, nrofactura, image, preciofinal, itemfinal) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [date, seller, citizenshipCard, direction, contact, phone, client, youMay, email, payment, invoiceNumber, image, priceEnd, itemEnd])
            const clientTable = await db.query("INSERT INTO clientes(nitocc, direccion, contacto, telefono, cliente, correo) VALUES (?,?,?,?,?,?)",
            [citizenshipCard, direction, contact, phone, client, email])
            .then((response) => {
                res.json({
                    ok:true,
                    msj:"Cliente y Cotizacion creado",
                    status: 300,
                })
            })
            db.end()
    } catch (error) {
        console.log('Error en la creacion: ', error)
            res.json({
                ok:false,
                msj:error,
                status: 430,
            })
    }
}

export const postQuotes = async (req, res) =>{
        try {
        console.log('Estamos intentando crear una nueva cotizacion')
        const {date, seller, citizenshipCard, direction, contact, phone, client, payment, email, youMay, invoiceNumber, image,  priceEnd, itemEnd} = req.body
            const db = await connect()
            await db.query("INSERT INTO cotizaciones(fechaentrega, asesor, nitocc, direccion, contacto, telefono, cliente, debe, correo, abono, nrofactura, image, preciofinal, itemfinal) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [date, seller, citizenshipCard, direction, contact, phone, client, youMay, email, payment, invoiceNumber, image,  priceEnd, itemEnd])
            .then((response) => {
                res.json({
                    ok:true,
                    msj:"Cotizacion creado",
                    status: 300,
                })
            })
            // //const clientTable = await db.query("INSERT INTO clientes(nitocc, direccion, contacto, telefono, cliente, correo) VALUES (?,?,?,?,?,?)",[citizenshipCard, direction, contact, phone, client, email])
            // const [Id] = await db.query("SELECT MAX(nrocotizacion) as n FROM cotizaciones")
            // console.log("Id: " + Id[0][0])
            // idNumberQuotes.push(Id)
            // console.log('idNumberQuotes: ', idNumberQuotes[0][0].n)
            db.end()
    } catch (error) {
        console.log('Error en la creacion: ', error)
            res.json({
                ok:false,
                msj:"Cotizacion Fallida",
                status: 400,
            })
    }
}

export const posthistoryproduct = async (req, res) =>{
    try {
        console.log('Estamos intentando crear un nuevo producto en el historial')
        const {product, material, caliber, long, width, itemPrice, totalItem, total, iva, Priceiva, weight} = req.body
            const db = await connect()
            await db.query("SELECT MAX(nrocotizacion) as n FROM cotizaciones")
            .then(async(res) => {
                console.log("El id de cotizacion: ",res[0][0].n)
                const response = await db.query("INSERT INTO historialproductos(producto, material, calibre, largo, ancho, precioitem, cantidadItem, total, nrocotizacion, iva, Priceiva, peso) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",[product, material, caliber, long, width, itemPrice, totalItem, total, res[0][0].n, iva, Priceiva, weight])
            }
            )
            // idNumberQuotes.push(Id)
            // const updatenroquotes = await db.query("UPDATE cotizaciones SET nrofactura = ? WHERE nrocotizacion = ?",[nrofactura, nrocotizacion])
            // idNumberQuotes = []
            res.json({
                ok:true,
                msj:"Producto creado",
                status: 300,
            })
            db.end()
    } catch (error) {
            res.json({
                ok:false,
                msj:error,
                status: 560,
            })
        console.log('Error en la creacion: ', error)
    }
}

export const editthistoryproduct = async (req, res) =>{
    try {
        console.log('Estamos intentando crear un producto en el historial')
        const {product, material, caliber, long, width, itemPrice, totalItem, total, nrocotizacion,  iva, Priceiva, weight} = req.body
            const db = await connect()
            const response = await db.query("INSERT INTO historialproductos(producto, material, calibre, largo, ancho, precioitem, cantidadItem, total, nrocotizacion,  iva, Priceiva, peso) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",[product, material, caliber, long, width, itemPrice, totalItem, total,nrocotizacion, iva, Priceiva, weight])
            // idNumberQuotes.push(Id)
            // const updatenroquotes = await db.query("UPDATE cotizaciones SET nrofactura = ? WHERE nrocotizacion = ?",[nrofactura, nrocotizacion])
            // idNumberQuotes = []
            res.json({
                ok:true,
                msj:"Producto creado",
                status: 300,
            })
            db.end()
    } catch (error) {
            res.json({
                ok:false,
                msj:error,
                status: 560,
            })
        console.log('Error en la creacion: ', error)
    }
}


export const Uploadfile = async (req, res) =>{
    try {
        console.log('Archivo resivido: ', req.body)
        const file = req.body.file
        res.send('He resivido la imagen')
        res.status = true
    } catch (error) {
        console.log('Error en el envio de imagen: ', error)
    }
}

export const putQuotes = async (req, res)=>{
    try {
        console.log("Estamos intentando editar una cotizacion")   
        const {nrocotizacion, cliente, documento, contacto, telefono, direccion, correo, vendedor, abono, factura, tiempo, imagen, preciofinal, itemfinal, debe} = req.body 
        const db = await connect()
        const response = await db.query("UPDATE cotizaciones SET asesor = ?, nitocc = ?, direccion = ?, contacto = ?, correo = ?, telefono = ?, abono = ?, nrofactura = ?, debe = ?, cliente = ?, image = ?, fechaentrega = ?, preciofinal = ?, itemfinal = ? WHERE nrocotizacion = ?",
        [vendedor, documento, direccion,  contacto, correo, telefono, abono, factura, debe, cliente, imagen, tiempo, preciofinal, itemfinal, nrocotizacion])
        res.json({msj:"Actualizado Cotizacion"})
        db.end()
    } catch (error) {
        console.log('Error en la subida: ', error)
        res.json({msj: error}) 
    }
}

export const putEditState = async (req, res)=>{
    try {
        console.log("Estamos intentando editar un cliente")   
        const {state, nrocotizacion } = req.body 
        console.log("Cambiando el estado a: ", state, "Del numero de cotizacion: ", nrocotizacion)
        const db = await connect()
        const response = await db.query("UPDATE cotizaciones SET estado = ? WHERE nrocotizacion = ?",
        [state, nrocotizacion])
        res.json({msj:"Actualizado cliente"})
        db.end()
    } catch (error) {
        console.log('Error en la subida: ', error)
        res.json({msj: error}) 
    }
}

export const putEditHistory = async (req, res)=>{
    try {
        console.log("Estamos intentando editar un producto del historial")   
        const {Id, producto, material, ancho, largo, calibre, itemtotal, precioitem, total, iva, Priceiva, peso} = req.body 
        const db = await connect()
        const response = await db.query("UPDATE historialproductos SET producto = ?, material = ?, calibre = ?, largo = ?, ancho = ?, precioitem = ?, cantidadItem = ?, total = ?, iva = ?, Priceiva = ?, peso = ? WHERE Id = ?",
        [producto, material, calibre, largo, ancho, precioitem, itemtotal, total, iva, Priceiva, peso, Id])
        res.json({msj:"Actualizado producto"})
        db.end()
    } catch (error) {
        console.log('Error en la subida: ', error)
        res.json({msj: error}) 
    }
}

export const deleteimage = async (req, res)=>{
    try {
        const {nrocotizacion, ImageDelete} = req.body 
        console.log("Borrar: ", nrocotizacion)   
        const db = await connect()
        const response = await db.query("DELETE From cotizaciones WHERE nrocotizacion = ?",nrocotizacion)
        rm("/root/BackendCotizador/uploads"+ImageDelete)     
        res.json({msj:"Borrar Cotizacion"})
        db.end()
    } catch (error) {
        console.log('Error en la  eliminacion de imagen: ', error)
        res.json({msj: "Error"}) 
    }
}

export const deleteHistoryProduct = async (req, res)=>{
    try {
        const {Id} = req.body 
        console.log("Borrar: ", Id)   
        const db = await connect()
        const response = await db.query("DELETE From historialproductos WHERE Id = ?",Id)
        res.json({msj:"Borrar Productos"})
        db.end()
    } catch (error) {
        console.log('Error en la  eliminacion de producto: ', error)
        res.json({msj: "Error"}) 
    }
}
