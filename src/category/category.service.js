import { createCategoryRepository } from './category.repository.js'
import { transformToCategoryEntity } from './category.entity.js'

const categoryRepository = createCategoryRepository()

export const createOne = (data) => {
  const category = categoryRepository.insertOne(data)

  return transformToCategoryEntity(category)
}

export const getAll = () => {
  const categories = categoryRepository
    .findAll()
    .map(transformToCategoryEntity)

  return categories
}

export const updateOne = (data) => {
  return categoryRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return categoryRepository.deleteOne(id)
}