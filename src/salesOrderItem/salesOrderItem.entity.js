const transformToSalesOrderItemEntity = (schema) => {
  const {
    id,
    public_id,
    sales_order_id,
    product_id,
    qty,
    product_sku,
    product_name,
    product_uom
  } = schema

  const salesOrderItem = {
    id,
    publicId: public_id,
    salesOrderId: sales_order_id,
    product: {
      id: product_id
    },
    qty: Number(qty)
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