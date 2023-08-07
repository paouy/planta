import * as categoryService from './category.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const category = categoryService.createOne(data)

  return reply.code(201).send(category)
}

export const getAll = (request, reply) => {
  const categories = categoryService.getAll()

  return reply.send(categories)
}

export const updateOne = (request, reply) => {
  const data = request.body
  categoryService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  categoryService.deleteOne(id)

  return reply.code(204).send()
}