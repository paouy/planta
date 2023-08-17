import * as equipmentService from './equipment.service.js'

export const createOne = (request, reply) => {
  if (!request.user.isAdmin) {
    return reply.code(401).send({ error: 'Unauthorized' })
  }

  const data = request.body
  const equipment = equipmentService.createOne(data)

  return reply.code(201).send(equipment)
}

export const getAll = (request, reply) => {
  const equipments = equipmentService.getAll()

  return reply.send(equipments)
}

export const updateOne = (request, reply) => {
  if (!request.user.isAdmin) {
    return reply.code(401).send({ error: 'Unauthorized' })
  }

  const data = request.body
  equipmentService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  if (!request.user.isAdmin) {
    return reply.code(401).send({ error: 'Unauthorized' })
  }
  
  const { id } = request.params
  equipmentService.deleteOne(id)

  return reply.code(204).send()
}