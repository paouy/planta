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
        qty
      )
      values (
        @id,
        @production_order_id,
        @operation_id,
        @workstation_id,
        @equipment_id,
        @type,
        @qty
      )
  `)
  
  const result = statement.run(data)

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
      workstations o
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