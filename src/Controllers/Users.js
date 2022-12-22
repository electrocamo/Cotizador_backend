import bcrypt from 'bcrypt'
import { connect } from "../../db/database";

const saltRounds = 10

export const Register = async (req, res) =>{
    try {
        console.log('Estamos intentando crear un nuevo perfil')
        const {name, surNames, type, numbreDocument, phone, email, password, checkPassword} = req.body
        if(password == checkPassword){
            const hashed = await bcrypt.hash(password, saltRounds);
            const db = await connect()
            const response = await db.query("INSERT INTO users(nombre, apellidos, tipo, cc, correo, telefono, password) VALUES (?,?,?,?,?,?,?)",[name, surNames, type, numbreDocument, email, phone, hashed])
            console.log(`El usuario ${name} a creado correctamente con contrasena `)
            res.json({
                ok:true,
                msj:"Las contraseñas coinciden",
                status: 298,
            })
            db.end()
        }else{
            console.log('Las contrasenas no coinciden')
            res.json({ok:false,msj:"Las contraseñas no coinciden"})
        }
    } catch (error) {
        console.log('Error en la creacion: ', error)
    }
}

export const Login = async (req, res) =>{
    try {
        console.log('Estamos intentando iniciar el perfil')
        const {email, password} = req.body
        let response ={}
        const db = await connect()
        const [TableUsers] = await db.query("SELECT * FROM users where correo = ?",[email])
        const Validate = TableUsers[0]
        console.log('Validacion:', Validate)
        if(Validate){
            console.log("correo = ",Validate.correo," clave = ",Validate.password)
            const compare = await bcrypt.compare(password,Validate.password)
            if(compare){
                    response = {
                        ok: true,
                        status: 200,
                        message: "Usuario Logueado",
                        data: TableUsers
                    }
                    res.send(response)
                }else{
                    response = {
                        ok: false,
                        status: 201,
                        message: "Contraseña Incorrecta"
                    }
                    res.send(response)
                }
        }else{
            response = {
                ok: false,
                status: 202,
                message: "Correo no existe"
            }
            res.send(response)
        }
        // const Validate = TableUsers[0].length
        // console.log(Validate)
        // if(0 === Validate){
        //     response={
        //         ok:false,
        //         status: 200,
        //         message: "Correo o Contraseña incorrecta"
        //     }
        //         res.send(response) 
        //         console.log('false')
        // }
        // else{
        //     response={
        //         ok:true,
        //         status: 200,
        //         message: "Iniciando sesion"
        //     }
        //     res.send(response)
        //     console.log('true') 
        // }
        // console.log('Tabla: ',TableUsers[0])
        // db.end()
    } catch (error) {
        console.log('Error en el inicio de sesion: ', error)
    }
}