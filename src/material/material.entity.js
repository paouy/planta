const transformToMaterialEntity = (schema) => {
  const {
    id,
    category_id,
    category_name,
    sku,
    name,
    uom,
    qty_available,
    qty_allocated = 0
  } = schema

  const material = {
    id,
    sku,
    name,
    normalizedName: `[${sku}] ${name}`,
    category: {
      id: category_id
    },
    uom,
    qtyAvailable: Number(qty_available),
    qtyAllocated: Number(qty_allocated)
  }

  if (category_name) {
    material.category.name = category_name
  }

  return material
}

export {
  transformToMaterialEntity
}