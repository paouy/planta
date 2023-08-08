import { createProductRepository } from './product.repository.js'
import { transformToProductEntity } from './product.entity.js'

const productRepository = createProductRepository()

export const createOne = (data) => {
  const product = productRepository.insertOne(data)

  return transformToProductEntity(product)
}

export const getOne = (id) => {
  const product = productRepository.findOne(id)

  return transformToProductEntity(product)
}

export const getAll = () => {
  const products = productRepository
    .findAll()
    .map(transformToProductEntity)

  return products
}

export const updateOne = (data) => {
  return productRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return productRepository.deleteOne(id)
}

export const increment = (data) => {
  return productRepository.incrementQtyAvailable(data)
}