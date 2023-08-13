import { sql, setValues, txn } from '../sqlite.js'
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

const insertMany = (data) => {
  data = data.map(mapToSalesOrderItemSchema)

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
  `)

  const transaction = txn(salesOrderItems => {
    for (const salesOrderItem of salesOrderItems) {
      statement.run(salesOrderItem)
    }
  })

  return transaction(data)
}

const findOne = (id) => {
  const statement = sql(`
    with production_order_count as (
      select
        sales_order_item_id,
        count(id) as count
      from
        production_orders
      where
        sales_order_item_id is not null
      and
        sales_order_item_id = @id
      and
        is_released = false
      and
        status != 'CANCELLED'
      group by
        sales_order_item_id
    )

    select
      soi.id,
      soi.public_id,
      soi.sales_order_id,
      soi.product_id,
      soi.qty,
      p.sku as product_sku,
      p.name as product_name,
      p.uom as product_uom,
      po.count as production_order_count
    from
      sales_order_items soi
    join
      products p
    on
      soi.product_id = p.id
    left join
      production_order_count po
    on
      soi.id = po.sales_order_item_id
    where
      soi.id = @id
  `)

  const result = statement.get({ id })

  return result
}

const findAllBySalesOrderId = (salesOrderId) => {
  const statement = sql(`
    with
      production as (
        select
          sales_order_item_id,
          count(id) as count,
          sum(qty) as qty
        from
          production_orders
        where
          sales_order_item_id is not null
        and
          is_released = false
        and
          status != 'CANCELLED'
        group by
          sales_order_item_id
      ),
      fulfillment as (
        select
          f.sales_order_item_id,
          sum(f.qty) as qty
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
          so.id = @filter
        group by
          f.sales_order_item_id
      )

    select
      soi.id,
      soi.public_id,
      soi.sales_order_id,
      soi.product_id,
      soi.qty,
      p.sku as product_sku,
      p.name as product_name,
      p.uom as product_uom,
      prd.count as production_order_count,
      prd.qty as qty_wip,
      a.qty as qty_allocated,
      f.qty as qty_fulfilled
    from
      sales_order_items soi
    join
      products p
    on
      soi.product_id = p.id
    left join
      production prd
    on
      soi.id = prd.sales_order_item_id
    left join
      allocations a
    on
      soi.id = a.sales_order_item_id
    left join
      fulfillment f
    on
      soi.id = f.sales_order_item_id
    where
      soi.sales_order_id = @filter
  `)

  const results = statement.all({ filter: salesOrderId })

  return results
}

const updateOne = (data) => {
  data = mapToSalesOrderItemSchema(data)

  const statement = sql(`update sales_order_items ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const updateMany = (data) => {
  data = data.map(mapToSalesOrderItemSchema)

  const transaction = txn(salesOrderItems => {
    for (const salesOrderItem of salesOrderItems) {
      sql(`update sales_order_items ${setValues(salesOrderItem)} where id = @id`).run(salesOrderItem)
    }
  })

  return transaction(data)
}

const deleteOne = (id) => {
  const statement = sql('delete from sales_order_items where id = ?')
  const result = statement.run(id)

  return result
}

export const createSalesOrderItemRepository = () => {
  return {
    insertOne,
    insertMany,
    findOne,
    findAllBySalesOrderId,
    updateOne,
    updateMany,
    deleteOne
  }
}