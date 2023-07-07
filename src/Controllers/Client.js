import { connect } from '../../db/database'

export const getCLient = async (req, res)=>{
    try { 
        const db = await connect()
        const [response] = await db.query("SELECT * FROM clientes")
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


export const postClient = async (req, res) =>{
    try {
        console.log('Estamos intentando crear un nuevo cliente')
        const {name, typeDocument, phone, email, numbreDocument, contact, direction, contactName} = req.body
        console.log("typeDocument: ", typeDocument)
            const db = await connect()
            const response = await db.query("INSERT INTO clientes(cliente, telefono, correo, nitocc, contacto, direccion, documentType, contactName) VALUES (?,?,?,?,?,?,?,?)",[name, phone, email, numbreDocument, contact, direction, typeDocument, contactName])
            // console.log(`El usuario ${name} a creado correctamente con contrasena `)
            res.json({
                ok:true,
                msj:"Cliente creado",
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
        console.log('Error en la creacion: ', error)
        res.json({
            ok:false,
            msj: error,
            status: 101,
        })
    }
}

export const putEditClient = async (req, res)=>{
    try {
        console.log("Estamos intentando editar un cliente")   
        const {id, name, numbreDocument, phone, email, direction, contact, typeDocument, contactName} = req.body 
        const db = await connect()
        const response = await db.query("UPDATE clientes SET cliente = ?, telefono = ?, correo = ?, nitocc = ?, contacto = ?, direccion = ?, documentType = ?, contactName = ? WHERE Id = ?",
        [name, phone, email, numbreDocument, contact, direction, typeDocument, contactName, id])
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

export const deleteCliente = async (req, res)=>{
    try {
        const {Id} = req.body 
        console.log("Borrar: ", Id)   
        const db = await connect()
        const response = await db.query("DELETE From clientes WHERE Id = ?",Id)
        res.json({msj:"Borrar cliente"})
        db.end((err) => {
            if (err) {
              console.error('Error al cerrar la conexión:', err);
              return;
            }
            console.log('Conexión cerrada correctamente.');
          });
    } catch (error) {
        console.log('Error en la  eliminacion del cliente: ', error)
        res.json({msj: "Error"}) 
    }
}