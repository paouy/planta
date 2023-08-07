import { sql, setValues } from '../sqlite.js'
import { mapToOperationSchema } from './operation.schema.js'

const insertOne = (data) => {
  data = mapToOperationSchema(data)

  const statement = sql(`
    insert into
      operations (
        id,
        name,
        seq,
        time_per_cycle_mins,
        allows_rework,
        is_batch,
        batch_size_parameter
      )
      values (
        @id,
        @name,
        @seq,
        @time_per_cycle_mins,
        @allows_rework,
        @is_batch,
        @batch_size_parameter
      )
    returning
      *
  `)
  
  const result = statement.get(data)

  return result
}

const findAll = () => {
  const statement = sql('select * from operations order by seq')
  const results = statement.all()

  return results
}

const updateOne = (data) => {
  data = mapToOperationSchema(data)

  const statement = sql(`update operations ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from operations where id = ?')
  const result = statement.run(id)

  return result
}

export const createOperationRepository = () => {
  return {
    insertOne,
    findAll,
    updateOne,
    deleteOne
  }
}