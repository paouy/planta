import { createEquipmentRepository } from './equipment.repository.js'
import { transformToEquipmentEntity } from './equipment.entity.js'

const equipmentRepository = createEquipmentRepository()

export const createOne = (data) => {
  const equipment = equipmentRepository.insertOne(data)

  return transformToEquipmentEntity(equipment)
}

export const getAll = () => {
  const equipments = equipmentRepository
    .findAll()
    .map(transformToEquipmentEntity)

  return equipments
}

export const updateOne = (data) => {
  return equipmentRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return equipmentRepository.deleteOne(id)
}