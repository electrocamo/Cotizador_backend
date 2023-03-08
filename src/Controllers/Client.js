import { connect } from '../../db/database'

export const getCLient = async (req, res)=>{
    try { 
        const db = await connect()
        const [response] = await db.query("SELECT * FROM clientes")
        console.log(response)
        res.json(response)
        db.end()
    } catch (error) {
        console.log(error)
    }
}


export const postClient = async (req, res) =>{
    try {
        console.log('Estamos intentando crear un nuevo perfil')
        const {name, surName, phone, email, numbreDocument, contact, direction} = req.body
            const db = await connect()
            const response = await db.query("INSERT INTO clientes(cliente, telefono, correo, nitocc, contacto, direccion) VALUES (?,?,?,?,?,?)",[name, phone, email, numbreDocument, contact, direction])
            // console.log(`El usuario ${name} a creado correctamente con contrasena `)
            res.json({
                ok:true,
                msj:"Cliente creado",
                status: 300,
            })
            db.end()
    } catch (error) {
        console.log('Error en la creacion: ', error)
    }
}