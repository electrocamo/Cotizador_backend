import { connect } from '../../db/database'
import { rm } from 'fs/promises';

export const getquotes = async (req, res)=>{
    try { 
        const db = await connect()
        const [response] = await db.query("SELECT * FROM cotizaciones")
        response.map((item)=>{
            var deliveryDate = '' + item.fecha
            deliveryDate = deliveryDate.split('T')[0];
        })
        res.json(response)
        db.end((err) => {
            if (err) {
              console.error('Error al cerrar la conexión:', err);
              return;
            }
            console.log('Conexión cerrada correctamente.');
          });

    } catch (error) {
        console.log(error)
    }
}


export const gethistoryproduct = async (req, res)=>{
    try { 
        const db = await connect()
        const [response] = await db.query("SELECT * FROM historialproductos")
        res.json(response)
        db.end((err) => {
            if (err) {
              console.error('Error al cerrar la conexión:', err);
              return;
            }
            console.log('Conexión cerrada correctamente.');
          });
         
    } catch (error) {
        console.log(error)
    }
}

export const postQuotesaddCLient = async (req, res) =>{
    try {
        console.log('Estamos intentando crear una nueva cotizacion con cliente nuevo')
        const {date, seller, typeDocument, citizenshipCard, direction, contact, phone, client, payment, email, youMay, invoiceNumber, image, priceEnd, itemEnd,observation} = req.body
            const db = await connect()
            await db.query("INSERT INTO cotizaciones(fechaentrega, asesor, nitocc, direccion, contacto, telefono, cliente, debe, correo, abono, nrofactura, image, preciofinal, itemfinal,observation, documentType) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [date, seller, citizenshipCard, direction, contact, phone, client, youMay, email, payment, invoiceNumber, image, priceEnd, itemEnd,observation, typeDocument])
            const clientTable = await db.query("INSERT INTO clientes(nitocc, direccion, contacto, telefono, cliente, correo, documentType) VALUES (?,?,?,?,?,?,?)",
            [citizenshipCard, direction, contact, phone, client, email, typeDocument])
            .then((response) => {
                res.json({
                    ok:true,
                    msj:"Cliente y Cotizacion creado",
                    status: 300,
                })
            })
            db.end((err) => {
                if (err) {
                  console.error('Error al cerrar la conexión:', err);
                  return;
                }
                console.log('Conexión cerrada correctamente.');
              });
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
        const {date, seller, typeDocument, citizenshipCard, direction, contact, phone, client, payment, email, youMay, invoiceNumber, image,  priceEnd, itemEnd,observation} = req.body
            const db = await connect()
            await db.query("INSERT INTO cotizaciones(fechaentrega, asesor, nitocc, direccion, contacto, telefono, cliente, debe, correo, abono, nrofactura, image, preciofinal, itemfinal,observation, documentType) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [date, seller, citizenshipCard, direction, contact, phone, client, youMay, email, payment, invoiceNumber, image,  priceEnd, itemEnd, observation, typeDocument])
            .then((response) => {
                res.json({
                    ok:true,
                    msj:"Cotizacion creado",
                    status: 300,
                })
            })

            db.end((err) => {
                if (err) {
                  console.error('Error al cerrar la conexión:', err);
                  return;
                }
                console.log('Conexión cerrada correctamente.');
              });
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
                //console.log("El id de cotizacion: ",res[0][0].n)
                const response = await db.query("INSERT INTO historialproductos(producto, material, calibre, largo, ancho, precioitem, cantidadItem, total, nrocotizacion, iva, Priceiva, peso) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",[product, material, caliber, long, width, itemPrice, totalItem, total, res[0][0].n, iva, Priceiva, weight])
            })

            res.json({
                ok:true,
                msj:"Producto creado",
                status: 300,
            })
            db.end((err) => {
                if (err) {
                  console.error('Error al cerrar la conexión:', err);
                  return;
                }
                console.log('Conexión cerrada correctamente.');
              });
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

            res.json({
                ok:true,
                msj:"Producto creado",
                status: 300,
            })
            db.end((err) => {
                if (err) {
                  console.error('Error al cerrar la conexión:', err);
                  return;
                }
                console.log('Conexión cerrada correctamente.');
              });
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
        const {nrocotizacion, cliente, typeDocument, documento, contacto, telefono, direccion, correo, vendedor, abono, factura, tiempo, imagen, preciofinal, itemfinal, debe, observation} = req.body 
        console.log("imagen: ", imagen)
        const db = await connect()
        const response = await db.query("UPDATE cotizaciones SET asesor = ?, nitocc = ?, direccion = ?, contacto = ?, correo = ?, telefono = ?, abono = ?, nrofactura = ?, debe = ?, cliente = ?, image = ?, fechaentrega = ?, preciofinal = ?, itemfinal = ?, observation = ?, documentType = ? WHERE nrocotizacion = ?",
        [vendedor, documento, direccion,  contacto, correo, telefono, abono, factura, debe, cliente, imagen, tiempo, preciofinal, itemfinal, observation, typeDocument, nrocotizacion])
        res.json({msj:"Actualizado Cotizacion"})
        db.end((err) => {
            if (err) {
              console.error('Error al cerrar la conexión:', err);
              return;
            }
            console.log('Conexión cerrada correctamente.');
          });
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
        db.end((err) => {
            if (err) {
              console.error('Error al cerrar la conexión:', err);
              return;
            }
            console.log('Conexión cerrada correctamente.');
          });
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
        db.end((err) => {
            if (err) {
              console.error('Error al cerrar la conexión:', err);
              return;
            }
            console.log('Conexión cerrada correctamente.');
          });
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
        if(ImageDelete == ''){
            console.log("ImageDelete esta vacio")
        }else{
            rm("/Users/adrian/Desktop/Ander/Backupproyects/BackendCotizadorGeniosTec/uploads/"+ImageDelete)     
        }
        res.json({msj:"Borrar Cotizacion"})
        db.end((err) => {
            if (err) {
              console.error('Error al cerrar la conexión:', err);
              return;
            }
            console.log('Conexión cerrada correctamente.');
          });
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
        db.end((err) => {
            if (err) {
              console.error('Error al cerrar la conexión:', err);
              return;
            }
            console.log('Conexión cerrada correctamente.');
          });
    } catch (error) {
        console.log('Error en la  eliminacion de producto: ', error)
        res.json({msj: "Error"}) 
    }
}

export const postRemission = async (req, res) =>{
    try {
        console.log('Estamos intentando crear una nueva remisión')
        const {nrocotizacion} = req.body
            const db = await connect()
            const response = await db.query("INSERT INTO remission(nrocotizacion) VALUES (?)",[nrocotizacion])
            res.json({
                ok:true,
                msj:"remisión creada",
                status: 300,
            })
            db.end((err) => {
                if (err) {
                  console.error('Error al cerrar la conexión:', err);
                  return;
                }
                console.log('Conexión cerrada correctamente.');
              });
        } catch (error) {
            res.json({
                ok:false,
                msj:error,
                status: 560,
            })
    }
}

export const getRemission = async (req, res)=>{
    try { 
        const db = await connect()
        const [response] = await db.query("SELECT * FROM Remission")
        console.log(response)
        res.json(response)
        db.end((err) => {
            if (err) {
              console.error('Error al cerrar la conexión:', err);
              return;
            }
            console.log('Conexión cerrada correctamente.');
          });
    } catch (error) {
        console.log(error)
    }
}