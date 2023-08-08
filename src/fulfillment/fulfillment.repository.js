import { sql } from '../sqlite.js'
import { mapToFulfillmentSchema } from './fulfillment.schema.js'

const insertOne = (data) => {
  data = mapToFulfillmentSchema(data)

  const statement = sql(`
    insert into
      fulfillments (
        id,
        sales_order_item_id,
        qty
      )
      values (
        @id,
        @sales_order_item_id,
        @qty
      )
  `)
  
  const result = statement.run(data)

  return result
}

const findAllBySalesOrderItemId = (salesOrderItemId) => {
  const statement = sql(`
    select
      *
    from
      fulfillments
    where
      sales_order_item_id = ?
    order by
      id
  `)

  const results = statement.all(salesOrderItemId)

  return results
}

const deleteOne = (id) => {
  const statement = sql('delete from fulfillments where id = ?')
  const result = statement.run(id)

  return result
}

export const createFulfillmentRepository = () => {
  return {
    insertOne,
    findAllBySalesOrderItemId,
    deleteOne
  }
}