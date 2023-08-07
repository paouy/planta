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
      *
  `)
  
  const result = statement.get(data)

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
      c.name as category_name
    from
      materials m
    join
      categories c
    on
      m.category_id = c.id
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

export const createMaterialRepository = () => {
  return {
    insertOne,
    findAll,
    updateOne,
    deleteOne
  }
}