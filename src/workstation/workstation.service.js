import { createWorkstationRepository } from './workstation.repository.js'
import { transformToWorkstationEntity } from './workstation.entity.js'

const workstationRepository = createWorkstationRepository()

export const createOne = (data) => {
  const workstation = workstationRepository.insertOne(data)

  return transformToWorkstationEntity(workstation)
}

export const getAll = () => {
  const workstations = workstationRepository
    .findAll()
    .map(transformToWorkstationEntity)

  return workstations
}

export const updateOne = (data) => {
  return workstationRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return workstationRepository.deleteOne(id)
}