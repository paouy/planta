import { sql, setValues, txn } from '../sqlite.js'
import { mapToAllocationSchema } from './allocation.schema.js'

const insertMany = (data) => {
  data = data.map(mapToAllocationSchema)

  const statement = sql(`
    insert into
      allocations (
        sales_order_item_id,
        qty
      )
      values (
        @sales_order_item_id,
        @qty
      )
  `)

  const transaction = txn(allocations => {
    for (const allocation of allocations) {
      statement.run(allocation)
    }
  })

  return transaction(data)
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
      sales_order_item_id
  `)

  const results = statement.all(salesOrderItemId)

  return results
}

const findAllByProductId = (productId) => {
  const statement = sql(`
    select
      a.sales_order_item_id,
      a.qty,
      soi.public_id as sales_order_item_public_id
    from
      allocations a
    join
      sales_order_items soi
    on
      a.sales_order_item_id = soi.id
    where
      soi.product_id = ?
    and
      a.qty > 0
    order by
      a.sales_order_item_id
  `)

  const results = statement.all(productId)

  return results
}

const incrementQty = (data) => {
  data = mapToAllocationSchema(data)

  const statement = sql(`
    update
      allocations
    set
      qty = qty + @qty
    where
      sales_order_item_id = @sales_order_item_id
  `)

  const result = statement.run(data)

  return result
}

const resetQtyBySalesOrderId = (salesOrderId) => {
  const statement = sql(`
    update
      allocations
    set
      qty = 0
    where
      sales_order_item_id
    in (
      select
        id
      from
        sales_order_items
      where
        sales_order_id = ?
    )
  `)

  const result = statement.run(salesOrderId)

  return result
}

const deleteOneBySalesOrderItemId = (salesOrderItemId) => {
  const statement = sql(`
    delete from
      allocations
    where
      sales_order_item_id = ?
  `)

  const result = statement.run(salesOrderItemId)

  return result
}

const deleteManyBySalesOrderId = (salesOrderId) => {
  const statement = sql(`
    delete from
      allocations
    where
      sales_order_item_id
    in (
      select
        id
      from
        sales_order_items
      where
        sales_order_id = ?
    )
  `)

  const result = statement.run(salesOrderId)

  return result
}

export const createAllocationRepository = () => {
  return {
    insertMany,
    findAllBySalesOrderItemId,
    findAllByProductId,
    incrementQty,
    resetQtyBySalesOrderId,
    deleteOneBySalesOrderItemId,
    deleteManyBySalesOrderId
  }
}