import * as workstationService from './workstation.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const workstation = workstationService.createOne(data)

  return reply.code(201).send(workstation)
}

export const getAll = (request, reply) => {
  const workstations = workstationService.getAll()

  return reply.send(workstations)
}

export const updateOne = (request, reply) => {
  const data = request.body
  workstationService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  workstationService.deleteOne(id)

  return reply.code(204).send()
}