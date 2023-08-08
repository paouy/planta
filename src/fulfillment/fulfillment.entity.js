const transformToFulfillmentEntity = (schema) => {
  const {
    id,
    sales_order_item_id,
    qty
  } = schema

  const allocation = {
    id,
    salesOrderItemId: sales_order_item_id,
    qty: Number(qty)
  }

  return allocation
}

export {
  transformToFulfillmentEntity
}