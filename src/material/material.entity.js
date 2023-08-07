const transformToMaterialEntity = (schema) => {
  const {
    id,
    category_id,
    category_name,
    sku,
    name,
    uom,
    qty_available
  } = schema

  const material = {
    id,
    sku,
    name,
    category: {
      id: category_id
    },
    uom,
    qtyAvailable: Number(qty_available)
  }

  if (category_name) {
    material.category.name = category_name
  }

  return material
}

export {
  transformToMaterialEntity
}