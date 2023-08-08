import { sql, setValues } from '../sqlite.js'
import { mapToWorkstationSchema } from './workstation.schema.js'

const insertOne = (data) => {
  data = mapToWorkstationSchema(data)

  const statement = sql(`
    insert into
      workstations (
        id,
        name,
        operation_id
      )
      values (
        @id,
        @name,
        @operation_id
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
      w.id,
      w.name,
      w.operation_id,
      o.name as operation_name
    from
      workstations w
    join
      operations o
    on
      w.operation_id = o.id
    where
      w.id = ?
  `)

  const result = statement.get(id)

  return result
}

const findAll = () => {
  const statement = sql(`
    select
      w.id,
      w.name,
      w.operation_id,
      o.name as operation_name
    from
      workstations w
    join
      operations o
    on
      w.operation_id = o.id
    order by
      o.seq,
      w.name
  `)

  const results = statement.all()

  return results
}

const updateOne = (data) => {
  data = mapToWorkstationSchema(data)

  const statement = sql(`update workstations ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from workstations where id = ?')
  const result = statement.run(id)

  return result
}

export const createWorkstationRepository = () => {
  return {
    insertOne,
    findAll,
    updateOne,
    deleteOne
  }
}