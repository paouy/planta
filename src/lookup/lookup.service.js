import { createLookupRepository } from './lookup.repository.js'
import { transformToLookupEntity } from './lookup.entity.js'

const lookupRepository = createLookupRepository()

export const getValue = (key) => {
  const returnedRow = lookupRepository.findOne(key)
  const value = transformToLookupEntity(returnedRow)

  return value
}

export const updateValue = ({ key, value }) => {
  return lookupRepository.updateOne({ key, value })
}

export const increment = ({ key, value }) => {
  return lookupRepository.increment({ key, value })
}