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
        console.log('Estamos intentando crear una nueva cotizacion')
        const {product, material, caliber, long, width, price} = req.body
            const db = await connect()
            const response = await db.query("INSERT INTO productos(producto, material, calibre, largo, ancho, precioitem) VALUES (?,?,?,?,?,?)",[product, material, caliber, long, width, price])
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