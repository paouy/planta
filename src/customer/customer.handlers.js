import * as customerService from './customer.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const customer = customerService.createOne(data)

  return reply.code(201).send(customer)
}

export const getAll = (request, reply) => {
  const customers = customerService.getAll()

  return reply.send(customers)
}

export const updateOne = (request, reply) => {
  const data = request.body
  customerService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  customerService.deleteOne(id)

  return reply.code(204).send()
}