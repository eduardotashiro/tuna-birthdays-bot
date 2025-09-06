import { readFileSync } from 'fs'

export function readBirthdays(filepath) {
    
    const data = readFileSync(filepath, 'utf-8')
    return JSON.parse(data)
}