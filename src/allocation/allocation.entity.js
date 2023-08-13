const transformToAllocationEntity = (schema) => {
  const {
    sales_order_item_id,
    qty,
    sales_order_item_public_id
  } = schema

  const allocation = {
    salesOrderItem: {
      id: sales_order_item_id
    },
    qty: Number(qty)
  }

  if (sales_order_item_public_id) {
    allocation.salesOrderItem.publicId = sales_order_item_public_id
  }

  return allocation
}

export {
  transformToAllocationEntity
}