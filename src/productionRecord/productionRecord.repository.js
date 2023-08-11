import { sql, setValues } from '../sqlite.js'
import { mapToProductionRecordSchema } from './productionRecord.schema.js'

const insertOne = (data) => {
  data = mapToProductionRecordSchema(data)

  const statement = sql(`
    insert into
      production_records (
        id,
        production_order_id,
        operation_id,
        workstation_id,
        equipment_id,
        type,
        qty,
        time_taken_mins
      )
      values (
        @id,
        @production_order_id,
        @operation_id,
        @workstation_id,
        @equipment_id,
        @type,
        @qty,
        @time_taken_mins
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
      pr.id,
      pr.production_order_id,
      pr.operation_id,
      pr.workstation_id,
      pr.equipment_id,
      pr.type,
      pr.qty,
      pr.time_taken_mins,
      o.name as operation_name,
      w.name as workstation_name,
      e.name as equipment_name
    from
      production_records pr
    join
      operations o
    on
      pr.operation_id = o.id
    left join
      workstations w
    on
      pr.workstation_id = w.id
    left join
      equipments e
    on
      pr.equipment_id = e.id
    where
      pr.id = ?
  `)

  const result = statement.get(id)

  return result
}

const findAllByProductionOrderId = (productionOrderId) => {
  const statement = sql(`
    select
      pr.id,
      pr.production_order_id,
      pr.operation_id,
      pr.workstation_id,
      pr.equipment_id,
      pr.type,
      pr.qty,
      pr.time_taken_mins,
      o.name as operation_name,
      w.name as workstation_name,
      e.name as equipment_name
    from
      production_records pr
    join
      operations o
    on
      pr.operation_id = o.id
    left join
      workstations w
    on
      pr.workstation_id = w.id
    left join
      equipments e
    on
      pr.equipment_id = e.id
    where
      pr.production_order_id = ?
    order by
      pr.id,
      o.seq
  `)

  const results = statement.all(productionOrderId)

  return results
}

export const createProductionRecordRepository = () => {
  return {
    insertOne,
    findAllByProductionOrderId
  }
}