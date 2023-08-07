import { sql, setValues } from '../sqlite.js'
import { mapToCustomerSchema } from './customer.schema.js'

const insertOne = (data) => {
  data = mapToCustomerSchema(data)

  const statement = sql(`
    insert into
      customers (
        id,
        name,
        short_name
      )
      values (
        @id,
        @name,
        @short_name
      )
    returning
      *
  `)
  
  const result = statement.get(data)

  return result
}

const findAll = () => {
  const statement = sql('select * from customers order by name')
  const results = statement.all()

  return results
}

const updateOne = (data) => {
  data = mapToCustomerSchema(data)

  const statement = sql(`update customers ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from customers where id = ?')
  const result = statement.run(id)

  return result
}

export const createCustomerRepository = () => {
  return {
    insertOne,
    findAll,
    updateOne,
    deleteOne
  }
}