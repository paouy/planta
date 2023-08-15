import { createLookupRepository } from './lookup.repository.js'
import { transformToLookupEntity } from './lookup.entity.js'

const lookupRepository = createLookupRepository()

export const getOne = (key) => {
  const returnedRow = lookupRepository.findOne(key)
  const lookup = transformToLookupEntity(returnedRow)

  return lookup
}

export const getMany = (keyArray) => {
  const returnedRows = lookupRepository.findMany(keyArray)
  const lookup = returnedRows.map(transformToLookupEntity).reduce((result, data) => {
    Object.assign(result, data)
    return result
  }, {})

  return lookup
}

export const updateOne = (data) => {
  return lookupRepository.updateOne(data)
}

export const increment = (data) => {
  return lookupRepository.increment(data)
}