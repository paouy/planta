import * as productService from './product.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const product = productService.createOne(data)

  return reply.code(201).send(product)
}

export const getOne = (request, reply) => {
  const { id } = request.params
  const product = productService.getOne(id)

  return reply.send(product)
}

export const getAll = (request, reply) => {
  const products = productService.getAll()

  return reply.send(products)
}

export const updateOne = (request, reply) => {
  const data = request.body
  productService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  productService.deleteOne(id)

  return reply.code(204).send()
}

export const increment = (request, reply) => {
  const { id } = request.params
  const { qty } = request.body
  productService.increment({ id, qty })

  return reply.code(204).send()
}