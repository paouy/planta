const mapToAllocationSchema = (data) => {
  const schema = {
    sales_order_item_id: data.salesOrderItem.id,
    qty: Number(data.qty || 0)
  }

  if ('isCommitted' in data) {
    schema.is_committed = Number(data.isCommitted)
  }

  return schema
}

export {
  mapToAllocationSchema
}