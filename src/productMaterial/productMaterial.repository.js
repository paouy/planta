import { sql } from '../sqlite.js'
import { mapToProductMaterialSchema } from './productMaterial.schema.js'

const insertOne = (data) => {
  data = mapToProductMaterialSchema(data)

  const statement = sql(`
    insert into
      product_materials (
        product_id,
        material_id,
        qty
      )
      values (
        @product_id,
        @material_id,
        @qty
      )
  `)
  
  const result = statement.run(data)

  return result
}

const findAllByProductId = (productId) => {
  const statement = sql(`
    select
      pm.product_id,
      pm.qty,
      m.id,
      m.sku,
      m.name,
      m.uom,
      c.name as category_name
    from
      product_materials pm
    join
      materials m
    on
      pm.material_id = m.id
    join
      categories c
    on
      m.category_id = c.id
    where
      pm.product_id = ?
    order by
      m.name,
      c.name
  `)

  const results = statement.all(productId)

  return results
}

const updateOne = (data) => {
  data = mapToProductMaterialSchema(data)

  const statement = sql(`
    update
      product_materials
    set
      qty = @qty
    where
      product_id = @product_id
    and
      material_id = @material_id
  `)

  const result = statement.run(data)

  return result
}

const deleteOne = (data) => {
  data = mapToProductMaterialSchema(data)

  const statement = sql(`
    delete from
      product_materials
    where
      product_id = @product_id
    and
      material_id = @material_id
  `)

  const result = statement.run(data)

  return result
}

export const createProductMaterialRepository = () => {
  return {
    insertOne,
    findAllByProductId,
    updateOne,
    deleteOne
  }
}