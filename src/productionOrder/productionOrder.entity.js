const transformToProductionOrderEntity = (schema) => {
  const {
    id,
    public_id,
    product_id,
    status,
    qty,
    priority,
    due_date,
    sales_order_item_id,
    product_sku,
    product_name,
    product_uom,
    sales_order_item_public_id
  } = schema

  const productionOrder = {
    id,
    publicId: sales_order_item_public_id || public_id,
    product: {
      id: product_id
    },
    status,
    qty: Number(qty),
    priority: Number(priority),
    dueDate: due_date
  }

  if (sales_order_item_id) {
    productionOrder.salesOrderItemId = sales_order_item_id
  }

  if (product_sku && product_name) {
    productionOrder.product.normalizedName = `[${product_sku}] ${product_name}`
  }

  if (product_uom) {
    productionOrder.product.uom = product_uom
  }

  return productionOrder
}

export {
  transformToProductionOrderEntity
}