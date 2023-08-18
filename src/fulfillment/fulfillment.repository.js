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
      f.id,
      f.sales_order_item_id,
      f.qty,
      soi.product_id,
      so.id as sales_order_id
    from
      fulfillments f
    join
      sales_order_items soi
    on
      f.sales_order_item_id = soi.id
    join
      sales_orders so
    on
      soi.sales_order_id = so.id
    where
      f.id = ?
  `)

  const result = statement.get(id)
  
  return result
}

const findAllBySalesOrderId = (salesOrderId) => {
  const statement = sql(`
    select
      f.id,
      f.qty,
      p.sku as product_sku,
      p.name as product_name,
      p.uom as product_uom
    from
      fulfillments f
    join
      sales_order_items soi
    on
      f.sales_order_item_id = soi.id
    join
      products p
    on
      soi.product_id = p.id
    join
      sales_orders so
    on
      soi.sales_order_id = so.id
    where
      so.id = ?
    order by
      f.id
  `)

  const results = statement.all(salesOrderId)

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
    findOne,
    findAllBySalesOrderId,
    deleteOne
  }
}