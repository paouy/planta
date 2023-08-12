import { sql, setValues } from '../sqlite.js'
import { mapToSalesOrderSchema } from './salesOrder.schema.js'

const insertOne = (data) => {
  data = mapToSalesOrderSchema(data)

  const statement = sql(`
    insert into
      sales_orders (
        id,
        public_id,
        customer_id,
        date,
        status
      )
      values (
        @id,
        @public_id,
        @customer_id,
        @date,
        @status
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
      so.id,
      so.public_id,
      so.customer_id,
      so.date,
      so.status,
      c.short_name as customer_short_name
    from
      sales_orders so
    join
      customers c
    on
      so.customer_id = c.id
    where
      so.id = ?
  `)

  const result = statement.get(id)

  return result
}

const findAllWithStatusFulfilled = () => {
  const statement = sql(`
    select
      so.id,
      so.public_id,
      so.customer_id,
      so.date,
      so.status,
      c.short_name as customer_short_name
    from
      sales_orders so
    join
      customers c
    on
      so.customer_id = c.id
    where
      so.status = 'FULFILLED'
    order by
      so.date
  `)

  const results = statement.all()

  return results
}

const findAllWithStatusNotFulfilled = () => {
  const statement = sql(`
    with
      related_sales_order_items as (
        select
          count(id) as count,
          sales_order_id
        from
          sales_order_items
        group by
          sales_order_id
      )

    select
      so.id,
      so.public_id,
      so.customer_id,
      so.date,
      so.status,
      c.short_name as customer_short_name,
      soi.count as item_count
    from
      sales_orders so
    join
      customers c
    on
      so.customer_id = c.id
    left join
      related_sales_order_items soi
    on
      so.id = soi.sales_order_id
    where
      so.status != 'FULFILLED'
    order by
      so.date
  `)

  const results = statement.all()

  return results
}

const updateOne = (data) => {
  data = mapToSalesOrderSchema(data)

  const statement = sql(`update sales_orders ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from sales_orders where id = ?')
  const result = statement.run(id)

  return result
}

export const createSalesOrderRepository = () => {
  return {
    insertOne,
    findOne,
    findAllWithStatusFulfilled,
    findAllWithStatusNotFulfilled,
    updateOne,
    deleteOne
  }
}