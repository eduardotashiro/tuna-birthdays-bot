import { pool } from './db.js'
import { getToday } from '../utils/date.js'

//pega MM-DD para parabenizar o fulano
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
        return res.rows
    } catch (err) {
        console.error('Erro ao buscar aniversariantes:', err)
        return [] //fallback
    }
}


//pega mẽs para mostrar que o fulano esta de aniversario nesse mês
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
        return res.rows
    } catch (err) {
        console.error('Erro ao buscar aniversariantes do mês:', err)
        return [] //fallback
    }
}

