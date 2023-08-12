const transformToSalesOrderItemEntity = (schema) => {
  const {
    id,
    public_id,
    sales_order_id,
    product_id,
    qty,
    product_sku,
    product_name,
    product_uom,
    qty_wip = 0,
    qty_allocated = 0,
    qty_fulfilled = 0,
    production_order_count
  } = schema

  const salesOrderItem = {
    id,
    publicId: public_id,
    salesOrderId: sales_order_id,
    product: {
      id: product_id
    },
    qty: Number(qty),
    qtyWip: Number(qty_wip),
    qtyAllocated: Number(qty_allocated),
    qtyFulfilled: Number(qty_fulfilled),
    productionOrderCount: Number(production_order_count)
  }

  if (product_sku && product_name) {
    salesOrderItem.product.normalizedName = `[${product_sku}] ${product_name}`
  }

  if (product_uom) {
    salesOrderItem.product.uom = product_uom
  }

  return salesOrderItem
}

export {
  transformToSalesOrderItemEntity
}