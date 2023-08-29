import { createMetafieldRepository } from './metafield.repository.js'
import { transformToMetafieldEntity } from './metafield.entity.js'

const metafieldRepository = createMetafieldRepository()

export const createOne = (data) => {
  const metafield = metafieldRepository.insertOne(data)

  return transformToMetafieldEntity(metafield)
}

export const getAll = () => {
  const metafields = metafieldRepository
    .findAll()
    .map(transformToMetafieldEntity)

  return metafields
}

export const getAllByResource = (resource) => {
  const metafields = metafieldRepository
    .findAllByResource(resource)
    .map(transformToMetafieldEntity)

  return metafields
}

export const updateOne = (data) => {
  return metafieldRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return metafieldRepository.deleteOne(id)
}