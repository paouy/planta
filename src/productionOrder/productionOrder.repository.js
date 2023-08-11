import { sql, setValues } from '../sqlite.js'
import { mapToProductionOrderSchema } from './productionOrder.schema.js'

const insertOne = (data) => {
  data = mapToProductionOrderSchema(data)

  const statement = sql(`
    insert into
      production_orders (
        id,
        public_id,
        product_id,
        status,
        qty,
        priority,
        due_date,
        is_released,
        sales_order_item_id
      )
      values (
        @id,
        @public_id,
        @product_id,
        @status,
        @qty,
        @priority,
        @due_date,
        @is_released,
        @sales_order_item_id
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
    with last_job as (
      select
        max(seq) AS seq
      from
        jobs
      where
        production_order_id = @id
    )

    select
      po.id,
      po.public_id,
      po.product_id,
      po.status,
      po.qty,
      po.priority,
      po.due_date,
      po.sales_order_item_id,
      p.sku as product_sku,
      p.name as product_name,
      p.uom as product_uom,
      (j.qty_output - j.qty_reject + j.qty_rework) as qty_made
    from
      production_orders po
    join
      products p
    on
      po.product_id = p.id
    join
      last_job lj
    on
      true
    left join
      jobs j
    on
      j.seq = lj.seq
    and
      j.status = 'CLOSED'
    where
      po.id = @id
  `)

  const result = statement.get({ id })

  return result
}

const findOneNotReleasedLastPriority = () => {
  const statement = sql(`
    select
      po.id,
      po.public_id,
      po.product_id,
      po.status,
      po.qty,
      po.priority,
      po.due_date,
      po.sales_order_item_id,
      p.sku as product_sku,
      p.name as product_name,
      p.uom as product_uom
    from
      production_orders po
    join
      products p
    on
      po.product_id = p.id
    order by
      po.priority desc,
      po.id desc
    limit
      1
  `)

  const result = statement.get()

  return result
}

const findAllNotReleased = () => {
  const statement = sql(`
    with last_jobs as (
      select
        production_order_id,
        max(seq) AS seq
      from
        jobs
      group by
        production_order_id
    )

    select
      po.id,
      po.public_id,
      po.product_id,
      po.status,
      po.qty,
      po.priority,
      po.due_date,
      po.sales_order_item_id,
      p.sku as product_sku,
      p.name as product_name,
      p.uom as product_uom,
      (j.qty_output - j.qty_reject + j.qty_rework) as qty_made
    from
      production_orders po
    join
      products p
    on
      po.product_id = p.id
    join
      last_jobs lj
    on
      po.id = lj.production_order_id
    left join
      jobs j
    on
      j.seq = lj.seq
    and
      j.status = 'CLOSED'
    where
      po.is_released = 0
    order by  
      po.priority,
      po.id
  `)

  const results = statement.all()

  return results
}

const findAllNotReleasedByProductId = (productId) => {
  const statement = sql(`
    select
      po.id,
      po.public_id,
      po.product_id,
      po.status,
      po.qty,
      po.priority,
      po.due_date,
      po.sales_order_item_id,
      p.sku as product_sku,
      p.name as product_name,
      p.uom as product_uom
    from
      production_orders po
    join
      products p
    on
      po.product_id = p.id
    where
      po.is_released = 0
    and
      po.product_id = ?
    order by
      po.id
  `)

  const results = statement.all(productId)

  return results
}

const findAllReleased = () => {
  const statement = sql(`
    select
      po.id,
      po.public_id,
      po.product_id,
      po.status,
      po.qty,
      po.priority,
      po.due_date,
      po.sales_order_item_id,
      p.sku as product_sku,
      p.name as product_name,
      p.uom as product_uom
    from
      production_orders po
    join
      products p
    on
      po.product_id = p.id
    where
      po.is_released = 1
    order by
      po.id
  `)

  const results = statement.all()

  return results
}

const updateOne = (data) => {
  data = mapToProductionOrderSchema(data)

  const statement = sql(`update production_orders ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from production_orders where id = ?')
  const result = statement.run(id)

  return result
}

export const createProductionOrderRepository = () => {
  return {
    insertOne,
    findOne,
    findOneNotReleasedLastPriority,
    findAllNotReleased,
    findAllNotReleasedByProductId,
    findAllReleased,
    updateOne,
    deleteOne
  }
}