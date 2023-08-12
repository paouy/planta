import { ulid } from 'ulidx'

const mapToAllocationSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if (data.salesOrderItem?.id) {
    schema.sales_order_item_id = data.salesOrderItem.id
  }

  if ('qty' in data) {
    schema.qty = Number(data.qty)
  }

  if ('isCommitted' in data) {
    schema.is_committed = Number(data.isCommitted)
  }

  if (!data.id) {
    schema.qty = 0
    schema.is_committed = Number(false)
  }

  return schema
}

export {
  mapToAllocationSchema
}