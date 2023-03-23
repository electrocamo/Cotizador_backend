import { connect } from '../../db/database'

export const getproducts = async (req, res)=>{
    try { 
        const db = await connect()
        const [response] = await db.query("SELECT * FROM productos")
        console.log(response)
        res.json(response)
        db.end()
    } catch (error) {
        console.log(error)
    }
}

export const postproduct = async (req, res) =>{
    try {
        console.log('Estamos intentando crear un nuevo producto')
        const {product, material, caliber, long, width, price, iva} = req.body
            const db = await connect()
            const response = await db.query("INSERT INTO productos(producto, material, calibre, largo, ancho, precioitem, iva) VALUES (?,?,?,?,?,?,?)",[product, material, caliber, long, width, price, iva])
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

export const deleteProduct = async (req, res)=>{
    try {
        const {Id} = req.body 
        console.log("Borrar: ", Id)   
        const db = await connect()
        const response = await db.query("DELETE From productos WHERE Id = ?",Id)
        res.json({msj:"Borrar Productos"})
        db.end()
    } catch (error) {
        console.log('Error en la  eliminacion de imagen: ', error)
        res.json({msj: "Error"}) 
    }
}

export const putEditProduct = async (req, res)=>{
    try {
        console.log("Estamos intentando editar un producto")   
        const {Id, producto, material, calibre, largo, ancho, precioitem} = req.body 
        const db = await connect()
        const response = await db.query("UPDATE productos SET producto = ?, material = ?, calibre = ?, largo = ?, ancho = ?, precioitem = ? WHERE Id = ?",
        [producto, material, calibre, largo, ancho, precioitem, Id])
        res.json({msj:"Actualizado producto"})
        db.end()
    } catch (error) {
        console.log('Error en la subida: ', error)
        res.json({msj: error}) 
    }
}
