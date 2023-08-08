import Database from 'better-sqlite3'
import { DB_PATH } from './config.js'

const db = new Database(DB_PATH)
const sql = db.prepare.bind(db)
const txn = db.transaction.bind(db)

const setValues = (data) => {
  const columns = Object.keys(data).filter(key => key !== 'id')

  return `set ${columns.map(col => `${col} = @${col}`).join(', ')}`
}

export {
  sql,
  txn,
  setValues
}