import { sql, setValues } from '../sqlite.js'
import { mapToProductSchema } from './product.schema.js'

const insertOne = (data) => {
  data = mapToProductSchema(data)

  const statement = sql(`
    insert into
      products (
        id,
        category_id,
        sku,
        name,
        operation_ids,
        uom,
        qty_available
      )
      values (
        @id,
        @category_id,
        @sku,
        @name,
        @operation_ids,
        @uom,
        @qty_available
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
    with
      production as (
        select
          sum(po.qty) as qty
        from
          production_orders po
        where
          po.is_released = false
        and
          po.product_id = @id
      ),
      allocation as (
        select
          sum(a.qty) as qty
        from
          allocations a
        join
          sales_order_items soi
        on
          a.sales_order_item_id = soi.id
        where
          soi.product_id = @id
      )

    select
      p.id,
      p.category_id,
      p.sku,
      p.name,
      p.operation_ids,
      p.uom,
      p.qty_available,
      c.name as category_name,
      prd.qty as qty_wip,
      a.qty as qty_allocated
    from
      products p
    join
      categories c
    on
      p.category_id = c.id
    left join
      production prd
    on
      true
    left join
      allocation a
    on
      true
    where
      p.id = @id
  `)

  const result = statement.get({ id })

  return result
}

const findAll = () => {
  const statement = sql(`
    with
      production as (
        select
          sum(qty) as qty,
          product_id
        from
          production_orders
        where
          is_released = false
        and
          status != 'CANCELLED'
        group by
          product_id
      ),
      allocation as (
        select
          sum(a.qty) as qty,
          soi.product_id
        from
          allocations a
        join
          sales_order_items soi
        on
          a.sales_order_item_id = soi.id
        group by
          soi.product_id
      )

    select
      p.id,
      p.category_id,
      p.sku,
      p.name,
      p.operation_ids,
      p.uom,
      p.qty_available,
      c.name as category_name,
      prd.qty as qty_wip,
      a.qty as qty_allocated
    from
      products p
    join
      categories c
    on
      p.category_id = c.id
    left join
      production prd
    on
      p.id = prd.product_id
    left join
      allocation a
    on
      p.id = a.product_id
    order by
      p.name,
      c.name
  `)

  const results = statement.all()

  return results
}

const updateOne = (data) => {
  data = mapToProductSchema(data)

  const statement = sql(`update products ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from products where id = ?')
  const result = statement.run(id)

  return result
}

const incrementQtyAvailable = (data) => {
  const statement = sql(`
    update
      products
    set
      qty_available = qty_available + @qty
    where
      id = @id
  `)

  const result = statement.run(data)

  return result
}

export const createProductRepository = () => {
  return {
    insertOne,
    findOne,
    findAll,
    updateOne,
    deleteOne,
    incrementQtyAvailable
  }
}