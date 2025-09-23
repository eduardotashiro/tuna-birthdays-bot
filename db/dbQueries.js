import { pool } from './db.js'
import { getToday } from '../utils/date.js'

export async function getBirthdaysToday() {
    const today = getToday() 

    try {  
        const res = await pool.query(
            `SELECT slack_id, full_name, lang
             FROM slack_users
             WHERE date_str = $1 AND (lang = 'pt' OR lang = 'es')`,
            [today] 
        )
        return res.rows 
    } catch (err) {
        console.error('Erro ao buscar aniversariantes:', err)
        return [] //fallback
    }
}
