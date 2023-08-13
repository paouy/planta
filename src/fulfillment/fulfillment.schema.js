import { ulid } from 'ulidx'

const mapToFulfillmentSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if ('salesOrderItemId' in data) {
    schema.sales_order_item_id = data.salesOrderItemId
  }

  if ('qty' in data) {
    schema.qty = Number(data.qty)
  }

  return schema
}

export {
  mapToFulfillmentSchema
}