import { ulid } from 'ulidx'

const mapToProductSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if (data.category?.id) {
    schema.category_id = data.category.id
  }

  if ('sku' in data) {
    schema.sku = data.sku
  }

  if ('name' in data) {
    schema.name = data.name
  }

  if ('operationIds' in data) {
    schema.operation_ids = JSON.stringify(data.operationIds)
  }

  if ('uom' in data) {
    schema.uom = data.uom
  }

  if ('qtyAvailable' in data) {
    schema.qty_available = Number(data.qtyAvailable)
  }

  if ('meta' in data) {
    schema.meta = JSON.stringify(data.meta)
  }

  if (!data.id) {
    schema.qty_available = 0
  }

  return schema
}

export {
  mapToProductSchema
}