import { pool } from './db.js'
import { getToday } from '../utils/date.js'

export async function getBirthdaysToday() {
    const today = getToday()

    try {
        const res = await pool.query(
        `SELECT slack_id, full_name, lang
        FROM slack_users
        WHERE TO_CHAR(birthday, 'MM-DD') = $1
        AND (lang = 'pt' OR lang = 'es')`,
        [today]
        )
        return res.rows // ex: [ { slack_id: 'U011RHB6666', full_name: 'Matheus', lang: 'pt' } ]
    } catch (err) {
        console.error('Erro ao buscar aniversariantes:', err)
        return [] 
    }
}



export async function getBirthdaysMonth() {

    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    
    try {
        const res = await pool.query(
        `SELECT full_name, TO_CHAR(birthday,'DD') AS day
        FROM slack_users
        WHERE TO_CHAR(birthday, 'MM') = $1
        ORDER BY TO_CHAR(birthday, 'DD')::int`,
        [month]
        )
        return res.rows  //[ { full_name: 'Edu', day: '06' }, { full_name: 'Dudu', day: '09' } ]
    } catch (err) {
        console.error('Erro ao buscar aniversariantes do mês:', err)
        return []
    }
}

