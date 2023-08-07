const transformToProductEntity = (schema) => {
  const {
    id,
    category_id,
    category_name,
    sku,
    name,
    operation_ids,
    uom,
    qty_available
  } = schema

  const product = {
    id,
    sku,
    name,
    normalizedName: `[${sku}] ${name}`,
    operationIds: JSON.parse(operation_ids),
    category: {
      id: category_id
    },
    uom,
    qtyAvailable: Number(qty_available)
  }

  if (category_name) {
    product.category.name = category_name
  }

  return product
}

export {
  transformToProductEntity
}