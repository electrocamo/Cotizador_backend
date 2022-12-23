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