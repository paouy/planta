import { metafieldService } from '../metafield/index.js'
import { createProductRepository } from './product.repository.js'
import { transformToProductEntity } from './product.entity.js'

const productRepository = createProductRepository()

export const createOne = (data) => {
  const insertedRow = productRepository.insertOne(data)

  return transformToProductEntity(insertedRow)
}

export const getOne = (id) => {
  const returnedRow = productRepository.findOne(id)
  const product = transformToProductEntity(returnedRow)

  if (product.meta) {
    const metafields = metafieldService.getAllByResource('PRODUCT')

    Object.keys(product.meta).forEach(id => {
      const { name } = metafields.find(metafield => id === metafield.id)
      product.meta[id].label = name
    })
  }

  return product
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