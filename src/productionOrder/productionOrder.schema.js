import { ulid } from 'ulidx'

const mapToProductionOrderSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if ('publicId' in data) {
    schema.public_id = data.publicId
  }

  if (data.product?.id) {
    schema.product_id = data.product.id
  }

  if ('status' in data) {
    schema.status = data.status.toUpperCase()
  }

  if ('qty' in data) {
    schema.qty = Number(data.qty)
  }

  if ('priority' in data) {
    schema.priority = Number(data.priority)
  }

  if ('dueDate' in data) {
    schema.due_date = data.dueDate
  }

  if ('isReleased' in data) {
    schema.is_released = Number(data.isReleased)
  }

  if ('salesOrderItemId' in data) {
    schema.sales_order_item_id = data.salesOrderItemId
  }

  if (!data.id) {
    schema.status = 'OPEN'
    schema.is_released = 0
    schema.sales_order_item_id = null
  }

  return schema
}

export {
  mapToProductionOrderSchema
}