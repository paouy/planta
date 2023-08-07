import { ulid } from 'ulidx'

const mapToSalesOrderItemSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if (!data.id && !data.publicId) {
    schema.public_id = null
  }

  if ('publicId' in data) {
    schema.public_id = data.publicId
  }

  if ('salesOrderId' in data) {
    schema.sales_order_id = data.salesOrderId
  }

  if (data.product?.id) {
    schema.product_id = data.product.id
  }

  if ('qty' in data) {
    schema.qty = Number(data.qty)
  }

  return schema
}

export {
  mapToSalesOrderItemSchema
}