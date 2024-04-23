import bcrypt from 'bcrypt'
import { connect } from "../../db/database";
import nodemailer from 'nodemailer'

const saltRounds = 10

export const Register = async (req, res) => {
    try {
        console.log('Estamos intentando crear un nuevo perfil')
        const { name, surNames, type, numbreDocument, phone, email, password, checkPassword, rol } = req.body
        if (password == checkPassword) {
            const hashed = await bcrypt.hash(password, saltRounds);
            const db = await connect()
            const response = await db.query("INSERT INTO users(nombre, apellidos, tipo, cc, correo, telefono, password, roles) VALUES (?,?,?,?,?,?,?,?)", [name, surNames, type, numbreDocument, email, phone, hashed, rol])
            //console.log(`El usuario ${name} a creado correctamente con contrasena `)
            res.json({
                ok: true,
                msj: "Las contraseñas coinciden",
                status: 298,
            })
            db.end()
        } else {
            //console.log('Las contrasenas no coinciden')
            res.json({ ok: false, msj: "Las contraseñas no coinciden" })
        }
    } catch (error) {
        //console.log('Error en la creacion: ', error)
        res.json({
            ok: false,
            msj: error,
            status: 983,
        })
    }
}

export const Login = async (req, res) => {
    try {
        console.log('Estamos intentando iniciar el perfil')
        const { email, password } = req.body
        let response = {}
        const db = await connect()
        const [TableUsers] = await db.query("SELECT * FROM users where correo = ?", [email])
        const Validate = TableUsers[0]
        //console.log('Validacion:', Validate)
        if (Validate) {
            //console.log("correo = ",Validate.correo," clave = ",Validate.password)
            const compare = await bcrypt.compare(password, Validate.password)
            if (compare) {
                response = {
                    ok: true,
                    status: 200,
                    message: "Usuario Logueado",
                    data: TableUsers
                }
                res.send(response)
            } else {
                response = {
                    ok: false,
                    status: 201,
                    message: "Contraseña Incorrecta"
                }
                res.send(response)
            }
        } else {
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
        db.end()
    } catch (error) {
        //console.log('Error en el inicio de sesion: ', error)
    }
}

export const getUsers = async (req, res) => {
    try {
        const db = await connect()
        const [response] = await db.query("SELECT * FROM users")
        //console.log(response)
        res.json(response)
        db.end((err) => {
            if (err) {
                //console.error('Error al cerrar la conexión:', err);
                return;
            }
            //console.log('Conexión cerrada correctamente.');
        });
    } catch (error) {
        //console.log(error)
    }
}

export const putUsers = async (req, res) => {
    try {
        const { Id, name, surNames, type, numbreDocument, phone, email, roles, newPassword, checkNewPassword } = req.body
        console.log("Actualizando Usuario")
        if (newPassword == checkNewPassword) {
            const hashed = await bcrypt.hash(newPassword, saltRounds);
            const db = await connect()
            const response = await db.query("UPDATE users SET nombre = ?, apellidos = ? , tipo = ?, cc = ? , correo = ?, telefono = ?, roles = ?, password = ? WHERE Id = ?", [name, surNames, type, numbreDocument, email, phone, roles, hashed, Id]).catch((error) => { console.log("Error: ", error) });
            //console.log("response: ", response)
            res.json({ msj: "Actualizado Usuario" })
            db.end((err) => {
                if (err) {
                    //console.error('Error al cerrar la conexión:', err);
                    return;
                }
                //console.log('Conexión cerrada correctamente.');
            });
        }
    } catch (error) {
        console.log('Error en la subida: ', error)
        res.json({ msj: "Error" })
    }
}

export const putChangerPassword = async (req, res) => {
    try {
        const { email, newPassword, checkNewPassword } = req.body;
        // console.log("Actualizando Usuario")   
        if (newPassword == checkNewPassword) {
            const hashed = await bcrypt.hash(newPassword, saltRounds);
            console.log('Código encriptado del cambio de clave:', hashed);
            const db = await connect();
            const response = await db.query("UPDATE users SET password = ? WHERE correo = ?", [hashed, email]);
            const response2 = await db.query("UPDATE verificationcode set state = ? WHERE email = ?", ['disabled', email])
            res.json({ msj: "password changed" });
            db.end(); // Cerrar la conexión después de ejecutar la consulta
        }
        // console.log("response: ", response)
    } catch (error) {
        console.log('Error en la subida: ', error);
        res.json({ msj: "Error" });
    }
};

export const deleteUsers = async (req, res) => {
    try {
        const { Id } = req.body
        console.log("Borrar: ", Id)
        const db = await connect()
        const response = await db.query("DELETE From users WHERE Id = ?", Id)
        res.json({ msj: "Borrar usuario" })
        db.end((err) => {
            if (err) {
                //console.error('Error al cerrar la conexión:', err);
                return;
            }
            //console.log('Conexión cerrada correctamente.');
        });
    } catch (error) {
        //console.log('Error en la  eliminacion de producto: ', error)
        res.json({ msj: "Error" })
    }
}

export const recoverPassword = async (req, res) => {
    try {
        const { email } = req.body
        // const resend = new Resend('re_GqNnKaT5_qL861rxtMSBCPE9kHktFYLoP');

        const code = Math.floor(100000 + Math.random() * 900000).toString();
        console.log('code: ', code)

        console.log('Correo: ', email)
        const db = await connect()
        const [response] = await db.query("SELECT * FROM users")
        db.end()
        console.log('Usuarios', response)
        const foundUser = response.find((user) => user.correo === email);
        if (foundUser) {
            console.log('correo valido')
            // Send response for valid email here
            res.json({ msj: "valid email" })
            try {
                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                        user: "cordoblezmasas3@gmail.com", // generated ethereal user
                        pass: "kqccyodgdexllcli", // generated ethereal password
                    },
                }, function (error, info) {
                    if (error) {
                        console.log("Error transporter", error);
                    }
                })

                transporter.verify(function (error, success) {
                    if (error) {
                    } else {
                        transporter.sendMail({
                            from: "geniostecnologicos.desarrollo@gmail.com", // sender address
                            to: email, // list of receivers
                            subject: code + " " + "es el código de recuperación de tu cuenta de CORDOBLEZ M.A S.A.S", // Subject line
                            text: code + " " + "es el código de recuperación de tu cuenta de CORDOBLEZ M.A S.A.S", // plain text body
                            html: "<b>Hemos recibido una solicitud para modificar la contraseña de CORDOBLEZ M.A S.A.S. Introduce el siguiente código para restablecer la contraseña:</b>" + " " + code,
                            // attachments: img
                        }, function (error, info) {
                            if (error) {
                                return console.log("Error sendEmail", error);
                            }
                        })
                    }
                });
                // resend.emails.send({
                //     from: 'Acme <geniostecnologicos.desarrollo@geniostec.com>',
                //     to: [email],
                //     subject: 'Codigo',
                //     html: `<p>Este es tu codigo para cambiar tu clave <strong>${code}</strong></p>`
                // });
                bcrypt.hash(code, 10, async (err, hash) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log('Código encriptado:', hash);
                    const db = await connect()
                    const response = await db.query("INSERT INTO verificationcode(email, code, state) VALUES (?,?,?)", [email, hash, 'active']);
                    db.end()
                    // Send "verify code" message to the frontend
                    // res.json({ msj: "verify code" })
                    setTimeout(async () => {
                        const db = await connect()
                        const response = await db.query("UPDATE verificationcode set state = ? WHERE email = ?", ['disabled', email])
                        db.end()
                        // Send "Time is up" message to the frontend
                        // res.json({ msj: "Time is up" })
                    }, 60000);
                });
            } catch (error) {
                console.log('error con el correo: ', error)
            }
        } else {
            console.log('correo no valido')
            // Send response for invalid email here
            res.json({ msj: "invalid email" })
        }
    } catch (error) {
        // Handle other errors here
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const codeChecking = async (req, res) => {
    try {
        const { email, code } = req.body;
        const db = await connect();

        // Buscar usuarios con el correo electrónico proporcionado y estado activo
        const [users] = await db.query("SELECT * FROM verificationcode WHERE email = ? AND state = 'active'", [email]);

        if (users.length === 0) {
            console.log("Correo electrónico no registrado o estado inactivo");
            return res.json({ msj: "Correo electrónico no registrado o estado inactivo" });
        }

        // Iterar sobre los usuarios encontrados con ese correo electrónico y estado activo
        for (const user of users) {
            const compare = await bcrypt.compare(code, user.code);
            if (compare) {
                console.log("Código correcto");
                return res.json({ msj: "Código correcto" });
            }
        }

        // Si ninguno de los usuarios tenía el código correcto
        console.log("Código incorrecto");
        return res.json({ msj: "Código incorrecto" });

    } catch (error) {
        console.error("Error en la verificación del código:", error);
        return res.status(500).json({ error: "Error en la verificación del código" });
    }
};