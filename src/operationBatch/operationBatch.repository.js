import { sql, setValues } from '../sqlite.js'
import { mapToOperationBatchSchema } from './operationBatch.schema.js'

const insertOne = (data) => {
  data = mapToOperationBatchSchema(data)

  const statement = sql(`
    insert into
      operation_batches (
        id,
        public_id,
        operation_id,
        workstation_id,
        status,
        schedule
      )
      values (
        @id,
        @public_id,
        @operation_id,
        @workstation_id,
        @status,
        @schedule
      )
    returning
      id
  `)
  
  const { id } = statement.get(data)
  const result = findOne(id)

  return result
}

const findOne = (id) => {
  const statement = sql(`
    select
      ob.id,
      ob.public_id,
      ob.operation_id,
      ob.workstation_id,
      ob.status,
      ob.schedule,
      w.name as workstation_name
    from
      operation_batches ob
    join
      workstations w
    on
      ob.workstation_id = w.id
    where
      ob.id = ?
  `)

  const result = statement.get(id)

  return result
}

const findAllNotClosed = () => {
  const statement = sql(`
    select
      ob.id,
      ob.public_id,
      ob.operation_id,
      ob.workstation_id,
      ob.status,
      ob.schedule,
      w.name as workstation_name
    from
      operation_batches ob
    join
      workstations w
    on
      ob.workstation_id = w.id
    where
      ob.status != 'CLOSED'
  `)

  const results = statement.all()

  return results
}

const updateOne = (data) => {
  data = mapToOperationBatchSchema(data)

  const statement = sql(`update operation_batches ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from operation_batches where id = ?')
  const result = statement.run(id)

  return result
}

export const createOperationBatchRepository = () => {
  return {
    insertOne,
    findOne,
    findAllNotClosed,
    updateOne,
    deleteOne
  }
}