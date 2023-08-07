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
      *
  `)
  
  const result = statement.get(data)

  return result
}

const findOne = (id) => {
  const statement = sql(`
    select
      p.id,
      p.category_id,
      p.sku,
      p.name,
      p.operation_ids,
      p.uom,
      p.qty_available,
      c.name as category_name
    from
      products p
    join
      categories c
    on
      p.category_id = c.id
    where
      p.id = ?
  `)

  const result = statement.get(id)

  return result
}

const findAll = () => {
  const statement = sql(`
    select
      p.id,
      p.category_id,
      p.sku,
      p.name,
      p.operation_ids,
      p.uom,
      p.qty_available,
      c.name as category_name
    from
      products p
    join
      categories c
    on
      p.category_id = c.id
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

export const createProductRepository = () => {
  return {
    insertOne,
    findOne,
    findAll,
    updateOne,
    deleteOne
  }
}