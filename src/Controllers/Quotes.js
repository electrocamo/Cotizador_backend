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
        console.log('Estamos intentando crear un nuevo perfil')
        const {date, seller, citizenshipCard, direction, contact, phone, client, payment, email, youMay, invoiceNumber, image, priceEnd, itemEnd} = req.body
            const db = await connect()
            await db.query("INSERT INTO cotizaciones(fechaentrega, asesor, nitocc, direccion, contacto, telefono, cliente, debe, correo, abono, nrofactura, image, preciofinal, itemfinal) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [date, seller, citizenshipCard, direction, contact, phone, client, youMay, email, payment, invoiceNumber, image, priceEnd, itemEnd])
            .then((response) => {
                res.json({
                    ok:true,
                    msj:"Cotizacion creado",
                    status: 300,
                })
            })
            const clientTable = await db.query("INSERT INTO clientes(nitocc, direccion, contacto, telefono, cliente, correo) VALUES (?,?,?,?,?,?)",[citizenshipCard, direction, contact, phone, client, email])
            // const [Id] = await db.query("SELECT MAX(nrocotizacion) FROM cotizaciones;")
            // console.log('Id: ', Id[0])
            // idNumberQuotes.push(Id)
	        //console.log(`El usuario ${name} a creado correctamente con contrasena `)
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
        console.log('Estamos intentando crear un nuevo perfil')
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
        console.log('Estamos intentando crear una nueva cotizacion')
        const {product, material, caliber, long, width, itemPrice, totalItem, total} = req.body
            console.log('Req Body:')
            console.log("productos: ", product)
            console.log("material: ", material)
            console.log("Calibre: ", caliber)
            console.log("Largo: ", long)
            console.log("ancho: ", width)
            console.log("precio item: ", itemPrice)
            console.log("total item: ", totalItem)
            console.log("Precio total ", total)
            const db = await connect()
            await db.query("SELECT MAX(nrocotizacion) as n FROM cotizaciones")
            .then(async(res) => {
                console.log("El id de cotizacion: ",res[0][0].n)
                const response = await db.query("INSERT INTO historialproductos(producto, material, calibre, largo, ancho, precioitem, cantidadItem, total, nrocotizacion) VALUES (?,?,?,?,?,?,?,?,?)",[product, material, caliber, long, width, itemPrice, totalItem, total, res[0][0].n])
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
        console.log('Estamos intentando crear una nueva cotizacion')
        const {product, material, caliber, long, width, itemPrice, totalItem, total, nrocotizacion} = req.body
            const db = await connect()
            const response = await db.query("INSERT INTO historialproductos(producto, material, calibre, largo, ancho, precioitem, cantidadItem, total, nrocotizacion) VALUES (?,?,?,?,?,?,?,?,?)",[product, material, caliber, long, width, itemPrice, totalItem, total,nrocotizacion])
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
        const {nrocotizacion, cliente, documento, contacto, telefono, direccion, correo, vendedor, abono, factura, tiempo, imagen, preciofinal, itemfinal, debe} = req.body 
        console.log("Actualizando id: ", nrocotizacion, 'Actualizando vendedor= ', vendedor, 'Actualizando documento= ', documento, 'Actualizando direccion= ', direccion,  'Actualizando contacto= ', contacto, 'Actualizando correo= ', correo, 'Actualizando telefono= ', telefono, 'Actualizando abono= ', abono, 'Actualizando factura= ', factura, 'Actualizando debe= ', debe, 'Actualizando cliente= ', cliente, 'Actualizando imagen= ',imagen, 'Actualizando tiempo= ', tiempo, 'Actualizando preciofinal= ', preciofinal, 'Actualizando itemfinal= ', itemfinal, 'Actualizando nrocotizacion= ', nrocotizacion)   
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

export const putEditHistory = async (req, res)=>{
    try {
        const {Id, producto, material, ancho, largo, calibre, itemtotal, precioitem, total} = req.body 
        console.log("Actualizando id: ", Id, 'Actualizando numero de factura= ', producto)   
        const db = await connect()
        const response = await db.query("UPDATE historialproductos SET producto = ?, material = ?, calibre = ?, largo = ?, ancho = ?, precioitem = ?, cantidadItem = ?, total = ? WHERE Id = ?",
        [producto, material, calibre, largo, ancho, precioitem, itemtotal, total, Id])
        res.json({msj:"Actualizado Cotizacion"})
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
        // rm("/Users/adrian/Desktop/Ander/PROYECTOS/BackendCotizador/uploads/"+ImageDelete)     
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
