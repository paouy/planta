import * as salesOrderService from './salesOrder.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  const salesOrder = salesOrderService.createOne(data)

  return reply.code(201).send(salesOrder)
}

export const getOne = (request, reply) => {
  const { id } = request.params
  try {
    const salesOrder = salesOrderService.getOne(id)

    return reply.send(salesOrder)
  } catch (error) {
    if (error.message === 'Not Found') {
      return reply.code(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Sales order not found'
      })
    }
  }
}

export const getAllFulfilled = (request, reply) => {
  const salesOrders = salesOrderService.getAllFulfilled()

  return reply.send(salesOrders)
}

export const getAllNotFulfilled = (request, reply) => {
  const salesOrders = salesOrderService.getAllNotFulfilled()

  return reply.send(salesOrders)
}

export const updateOne = (request, reply) => {
  const data = request.body
  salesOrderService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  const { id } = request.params
  salesOrderService.deleteOne(id)

  return reply.code(204).send()
}

export const confirm = (request, reply) => {
  const { id } = request.params
  salesOrderService.confirm(id)

  return reply.code(204).send()
}

export const cancel = (request, reply) => {
  const { id } = request.params
  const { status } = request.body

  if (!status) {
    return reply.code(400).send({
      error: 'Bad Request',
      message: 'Missing required request body key: status',
      statusCode: 400
    })
  }

  salesOrderService.cancel({ id, status })

  return reply.code(204).send()
}