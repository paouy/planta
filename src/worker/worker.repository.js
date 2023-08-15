import { sql, setValues } from '../sqlite.js'
import { mapToWorkerSchema } from './worker.schema.js'

const insertOne = (data) => {
  data = mapToWorkerSchema(data)

  const statement = sql(`
    insert into
      workers (
        id,
        public_id,
        first_name,
        last_name
      )
      values (
        @id,
        @public_id,
        @first_name,
        @last_name
      )
    returning
      *
  `)
  
  const result = statement.get(data)

  return result
}

const findAll = () => {
  const statement = sql('select * from workers order by last_name, first_name')
  const results = statement.all()

  return results
}

const updateOne = (data) => {
  data = mapToWorkerSchema(data)

  const statement = sql(`update workers ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from workers where id = ?')
  const result = statement.run(id)

  return result
}

export const createWorkerRepository = () => {
  return {
    insertOne,
    findAll,
    updateOne,
    deleteOne
  }
}