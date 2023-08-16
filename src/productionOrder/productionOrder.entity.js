const transformToProductionOrderEntity = (schema) => {
  const {
    id,
    public_id,
    product_id,
    product_sku,
    product_name,
    product_uom,
    status,
    is_released,
    qty,
    priority,
    due_date,
    sales_order_item_id,
    seq,
    qty_made = 0
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
    qtyMade: Number(qty_made),
    priority: Number(priority),
    dueDate: due_date
  }

  if (seq) {
    productionOrder.seq = Number(seq)
  }

  if (is_released) {
    productionOrder.isReleased = Boolean(is_released)
  }

  if (sales_order_item_id) {
    productionOrder.salesOrderItemId = sales_order_item_id
  }

  return productionOrder
}

export {
  transformToProductionOrderEntity
}