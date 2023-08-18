import { decodeTime } from 'ulidx'

const transformToFulfillmentEntity = (schema) => {
  const {
    id,
    sales_order_item_id,
    qty,
    product_id,
    sales_order_id,
    product_sku,
    product_name,
    product_uom
  } = schema

  const fulfillment = {
    id,
    qty: Number(qty),
    timestamp: decodeTime(id)
  }

  if (sales_order_item_id) {
    fulfillment.salesOrderItemId = sales_order_item_id
  }

  if (product_id) {
    fulfillment.productId = product_id
  }

  if (sales_order_id) {
    fulfillment.salesOrderId = sales_order_id
  }

  if (product_sku && product_name && product_uom) {
    fulfillment.product = {
      normalizedName: `[${product_sku}] ${product_name}`,
      uom: product_uom
    }
  }

  return fulfillment
}

export {
  transformToFulfillmentEntity
}