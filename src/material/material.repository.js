import { sql, setValues } from '../sqlite.js'
import { mapToMaterialSchema } from './material.schema.js'

const insertOne = (data) => {
  data = mapToMaterialSchema(data)

  const statement = sql(`
    insert into
      materials (
        id,
        category_id,
        sku,
        name,
        uom,
        qty_available
      )
      values (
        @id,
        @category_id,
        @sku,
        @name,
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
    select
      m.id,
      m.category_id,
      m.sku,
      m.name,
      m.uom,
      m.qty_available,
      c.name as category_name
    from
      materials m
    join
      categories c
    on
      m.category_id = c.id
    where
      m.id = ?
  `)

  const result = statement.get(id)

  return result
}

const findAll = () => {
  const statement = sql(`
    select
      m.id,
      m.category_id,
      m.sku,
      m.name,
      m.uom,
      m.qty_available,
      c.name as category_name,
      coalesce(sum(po.qty * pm.qty), 0) as qty_allocated
    from
      materials m
    join
      categories c
    on
      m.category_id = c.id
    left join
      product_materials pm
    on
      m.id = pm.material_id
    left join
      production_orders po
    on
      pm.product_id = po.product_id
    and
      po.is_released = 0
    and
      po.status != 'CANCELLED'
    group by
      c.name,
      m.id
    order by
      m.name,
      c.name
  `)

  const results = statement.all()

  return results
}

const updateOne = (data) => {
  data = mapToMaterialSchema(data)

  const statement = sql(`update materials ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from materials where id = ?')
  const result = statement.run(id)

  return result
}

const incrementQtyAvailable = (data) => {
  const statement = sql(`
    update
      materials
    set
      qty_available = qty_available + @qty
    where
      id = @id
  `)

  const result = statement.run(data)

  return result
}

export const createMaterialRepository = () => {
  return {
    insertOne,
    findAll,
    updateOne,
    deleteOne,
    incrementQtyAvailable
  }
}