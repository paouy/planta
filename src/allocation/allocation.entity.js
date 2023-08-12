const transformToAllocationEntity = (schema) => {
  const {
    sales_order_item_id,
    qty,
    is_committed,
    sales_order_item_public_id
  } = schema

  const allocation = {
    salesOrderItem: {
      id: sales_order_item_id
    },
    qty: Number(qty),
    isCommitted: Boolean(is_committed)
  }

  if (sales_order_item_public_id) {
    allocation.salesOrderItem.publicId = sales_order_item_public_id
  }

  return allocation
}

export {
  transformToAllocationEntity
}