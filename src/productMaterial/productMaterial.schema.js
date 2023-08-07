const mapToProductMaterialSchema = (data) => {
  const schema = {
    product_id: data.productId,
    material_id: data.id
  }

  if ('qty' in data) {
    schema.qty = Number(data.qty)
  }

  return schema
}

export {
  mapToProductMaterialSchema
}