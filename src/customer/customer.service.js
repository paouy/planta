import { createCustomerRepository } from './customer.repository.js'
import { transformToCustomerEntity } from './customer.entity.js'

const customerRepository = createCustomerRepository()

export const createOne = (data) => {
  const customer = customerRepository.insertOne(data)

  return transformToCustomerEntity(customer)
}

export const getAll = () => {
  const customers = customerRepository
    .findAll()
    .map(transformToCustomerEntity)

  return customers
}

export const updateOne = (data) => {
  return customerRepository.updateOne(data)
}

export const deleteOne = (id) => {
  return customerRepository.deleteOne(id)
}