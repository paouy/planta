import * as materialService from './material.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const material = materialService.createOne(data)

  return reply.code(201).send(material)
}

export const getAll = (request, reply) => {
  const materials = materialService.getAll()

  return reply.send(materials)
}

export const updateOne = (request, reply) => {
  const data = request.body
  materialService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  materialService.deleteOne(id)

  return reply.code(204).send()
}