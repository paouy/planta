import { createMaterialRepository } from './material.repository.js'
import { transformToMaterialEntity } from './material.entity.js'

const materialRepository = createMaterialRepository()

export const createOne = (data) => {
  const material = materialRepository.insertOne(data)

  return transformToMaterialEntity(material)
}

export const getAll = () => {
  const materials = materialRepository
    .findAll()
    .map(transformToMaterialEntity)

  return materials
}

export const updateOne = (data) => {
  return materialRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return materialRepository.deleteOne(id)
}

export const increment = (data) => {
  return materialRepository.incrementQtyAvailable(data)
}