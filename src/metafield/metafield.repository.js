import { sql, setValues } from '../sqlite.js'
import { mapToMetafieldSchema } from './metafield.schema.js'

const insertOne = (data) => {
  data = mapToMetafieldSchema(data)

  const statement = sql(`
    insert into
      metafields (
        id,
        name,
        type,
        resource,
        attributes
      )
      values (
        @id,
        @name,
        @type,
        @resource,
        @attributes
      )
    returning
      *
  `)

  const result = statement.get(data)

  return result
}

const findAll = () => {
  const statement = sql('select * from metafields order by resource, name')
  const results = statement.all()

  return results
}

const findAllByResource = (resource) => {
  const statement = sql('select * from metafields where resource = ? order by name')
  const results = statement.all(resource)

  return results
}

const updateOne = (data) => {
  data = mapToMetafieldSchema(data)

  const statement = sql(`update metafields ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from metafields where id = ?')
  const result = statement.run(id)

  return result
}

export const createMetafieldRepository = () => {
  return {
    insertOne,
    findAll,
    findAllByResource,
    updateOne,
    deleteOne
  }
}