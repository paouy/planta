import { createProductMaterialRepository } from './productMaterial.repository.js'
import { transformToProductMaterialEntity } from './productMaterial.entity.js'

const productMaterialRepository = createProductMaterialRepository()

export const createOne = (data) => {
  return productMaterialRepository.insertOne(data)
}

export const getAllByProduct = (productId) => {
  const productMaterials = productMaterialRepository
    .findAllByProductId(productId)
    .map(transformToProductMaterialEntity)

  return productMaterials
}

export const updateOne = (data) => {
  return productMaterialRepository.updateOne(data)
}

export const deleteOne = (data) => {
  return productMaterialRepository.deleteOne(data)
}