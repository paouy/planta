import { sql } from '../sqlite.js'
import { mapToLookupSchema } from './lookup.schema.js'

const findOne = (key) => {
  key = mapToLookupSchema(key)

  const statement = sql('select value, type from lookup where key = ?')
  const result = statement.get(key)

  return result
}

const updateOne = (data) => {
  data = mapToLookupSchema(data)

  const statement = sql(`update lookup set value = @value where key = @key`)
  const result = statement.run(data)

  return result
}

const increment = (data) => {
  data = mapToLookupSchema(data)

  const statement = sql(`
    update
      lookup
    set
      value = value + @value
    where
      key = @key
    and
      type = 'NUMBER'
    returning
      value
  `)

  const result = statement.get(data)

  return result
}

export const createLookupRepository = () => {
  return {
    findOne,
    updateOne,
    increment
  }
}