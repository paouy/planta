import { sql, setValues } from '../sqlite.js'
import { mapToSalesOrderItemSchema } from './salesOrderItem.schema.js'

const insertOne = (data) => {
  data = mapToSalesOrderItemSchema(data)

  const statement = sql(`
    insert into
      sales_order_items (
        id,
        public_id,
        sales_order_id,
        product_id,
        qty
      )
      values (
        @id,
        @public_id,
        @sales_order_id,
        @product_id,
        @qty
      )
    returning
      *
  `)
  
  const result = statement.get(data)

  return result
}

const findOne = (id) => {
  const statement = sql(`
    select
      soi.id,
      soi.public_id,
      soi.sales_order_id,
      soi.product_id,
      soi.qty,
      p.sku as product_sku,
      p.name as product_name,
      p.uom as product_uom
    from
      sales_order_items soi
    join
      products p
    on
      soi.product_id = p.id
    where
      soi.id = ?
  `)

  const result = statement.get(id)

  return result
}

const findAllBySalesOrderId = (salesOrderId) => {
  const statement = sql(`
    select
      soi.id,
      soi.public_id,
      soi.sales_order_id,
      soi.product_id,
      soi.qty,
      p.sku as product_sku,
      p.name as product_name,
      p.uom as product_uom
    from
      sales_order_items soi
    join
      products p
    on
      soi.product_id = p.id
    where
      soi.sales_order_id = ?
  `)

  const results = statement.all(salesOrderId)

  return results
}

const updateOne = (data) => {
  data = mapToSalesOrderItemSchema(data)

  const statement = sql(`update sales_order_items ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from sales_order_items where id = ?')
  const result = statement.run(id)

  return result
}

export const createSalesOrderItemRepository = () => {
  return {
    insertOne,
    findOne,
    findAllBySalesOrderId,
    updateOne,
    deleteOne
  }
}