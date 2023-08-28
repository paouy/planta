const transformToProductEntity = (schema) => {
  const {
    id,
    category_id,
    category_name,
    sku,
    name,
    operation_ids,
    uom,
    meta,
    qty_available,
    qty_wip = 0,
    qty_allocated = 0
  } = schema

  const product = {
    id,
    sku,
    name,
    normalizedName: `[${sku}] ${name}`,
    operationIds: JSON.parse(operation_ids),
    category: {
      id: category_id,
      name: category_name
    },
    uom,
    meta: meta ? JSON.parse(meta) : null,
    qtyAvailable: Number(qty_available),
    qtyWip: Number(qty_wip),
    qtyAllocated: Number(qty_allocated)
  }

  return product
}

export {
  transformToProductEntity
}