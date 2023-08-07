const transformToProductMaterialEntity = (schema) => {
  const {
    product_id,
    id,
    category_name,
    sku,
    name,
    uom,
    qty
  } = schema

  const productMaterial = {
    productId: product_id,
    id,
    normalizedName: `[${sku}] ${name}`,
    categoryName: category_name,
    uom,
    qty: Number(qty)
  }

  return productMaterial
}

export {
  transformToProductMaterialEntity
}