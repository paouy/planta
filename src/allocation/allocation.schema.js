const mapToAllocationSchema = (data) => {
  const schema = {
    sales_order_item_id: data.salesOrderItem.id,
    qty: Number(data.qty || 0)
  }

  return schema
}

export {
  mapToAllocationSchema
}