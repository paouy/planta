import { sql, setValues } from '../sqlite.js'
import { mapToAllocationSchema } from './allocation.schema.js'

const insertOne = (data) => {
  data = mapToAllocationSchema(data)

  const statement = sql(`
    insert into
      allocations (
        id,
        sales_order_item_id,
        qty,
        is_committed
      )
      values (
        @id,
        @sales_order_item_id,
        @qty,
        @is_committed
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
      allocations
    where
      sales_order_item_id = ?
    order by
      id
  `)

  const results = statement.all(salesOrderItemId)

  return results
}

const findAllByProductId = (productId) => {
  const statement = sql(`
    select
      a.id,
      a.sales_order_item_id,
      a.qty,
      a.is_committed,
      soi.public_id as sales_order_item_public_id
    from
      allocations a
    join
      sales_order_items soi
    on
      a.sales_order_item_id = soi.id
    where
      soi.product_id = ?
    order by
      a.id
  `)

  const results = statement.all(productId)

  return results
}

const updateOne = (data) => {
  data = mapToAllocationSchema(data)

  const statement = sql(`update allocations ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from allocations where id = ?')
  const result = statement.run(id)

  return result
}

export const createAllocationRepository = () => {
  return {
    insertOne,
    findAllBySalesOrderItemId,
    findAllByProductId,
    updateOne,
    deleteOne
  }
}