import { sql, setValues } from '../sqlite.js'
import { mapToEquipmentSchema } from './equipment.schema.js'

const insertOne = (data) => {
  data = mapToEquipmentSchema(data)

  const statement = sql(`
    insert into
      equipments (
        id,
        name,
        operation_ids
      )
      values (
        @id,
        @name,
        @operation_ids
      )
    returning
      *
  `)
  
  const result = statement.get(data)

  return result
}

const findAll = () => {
  const statement = sql('select * from equipments order by name')
  const results = statement.all()

  return results
}

const updateOne = (data) => {
  data = mapToEquipmentSchema(data)

  const statement = sql(`update equipments ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from equipments where id = ?')
  const result = statement.run(id)

  return result
}

export const createEquipmentRepository = () => {
  return {
    insertOne,
    findAll,
    updateOne,
    deleteOne
  }
}