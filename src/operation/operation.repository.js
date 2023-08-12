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
  const statement = sql(`
    with
      operations_with_equipment as (
        select distinct
          json_each.value as operation_id,
          true as has_equipment
        from
          equipments
        join
          json_each(equipments.operation_ids)
        on
          true
      )

    select
      o.*,
      oe.has_equipment
    from
      operations o
    left join
      operations_with_equipment oe
    on
      o.id = oe.operation_id
    order by
      o.seq
  `)

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