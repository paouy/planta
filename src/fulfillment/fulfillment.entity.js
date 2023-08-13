const transformToFulfillmentEntity = (schema) => {
  const {
    id,
    sales_order_item_id,
    qty,
    product_id,
    sales_order_id
  } = schema

  const fulfillment = {
    id,
    salesOrderItemId: sales_order_item_id,
    qty: Number(qty)
  }

  if (product_id) {
    fulfillment.productId = product_id
  }

  if (sales_order_id) {
    fulfillment.salesOrderId = sales_order_id
  }

  return fulfillment
}

export {
  transformToFulfillmentEntity
}