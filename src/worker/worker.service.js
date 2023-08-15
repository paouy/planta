import { createWorkerRepository } from './worker.repository.js'
import { transformToWorkerEntity } from './worker.entity.js'

const workerRepository = createWorkerRepository()

export const createOne = (data) => {
  const worker = workerRepository.insertOne(data)

  return transformToWorkerEntity(worker)
}

export const getAll = () => {
  const workers = workerRepository
    .findAll()
    .map(transformToWorkerEntity)

  return workers
}

export const updateOne = (data) => {
  return workerRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return workerRepository.deleteOne(id)
}