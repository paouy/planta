const transformToProductionOrderEntity = (schema) => {
  const {
    id,
    public_id,
    product_id,
    product_sku,
    product_name,
    product_uom,
    status,
    qty,
    priority,
    due_date,
    sales_order_item_id,
    seq
  } = schema

  const productionOrder = {
    id,
    publicId: public_id,
    product: {
      id: product_id,
      normalizedName: `[${product_sku}] ${product_name}`,
      uom: product_uom
    },
    status,
    qty: Number(qty),
    priority: Number(priority),
    dueDate: due_date
  }

  if (seq) {
    productionOrder.seq = Number(seq)
  }

  if (sales_order_item_id) {
    productionOrder.salesOrderItemId = sales_order_item_id
  }

  return productionOrder
}

export {
  transformToProductionOrderEntity
}