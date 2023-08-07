import { sql, setValues } from '../sqlite.js'
import { mapToCategorySchema } from './category.schema.js'

const insertOne = (data) => {
  data = mapToCategorySchema(data)

  const statement = sql(`
    insert into
      categories (
        id,
        name,
        type
      )
      values (
        @id,
        @name,
        @type
      )
    returning
      *
  `)
  
  const result = statement.get(data)

  return result
}

const findAll = () => {
  const statement = sql('select * from categories order by type, name')
  const results = statement.all()

  return results
}

const updateOne = (data) => {
  data = mapToCategorySchema(data)

  const statement = sql(`update categories ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from categories where id = ?')
  const result = statement.run(id)

  return result
}

export const createCategoryRepository = () => {
  return {
    insertOne,
    findAll,
    updateOne,
    deleteOne
  }
}