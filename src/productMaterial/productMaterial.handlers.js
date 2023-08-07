import * as productMaterialService from './productMaterial.service.js'

export const createOne = (request, reply) => {
  const data = request.body
  productMaterialService.createOne(data)

  return reply.code(201).send()
}

export const getAllByProduct = (request, reply) => {
  const { productId } = request.query

  if (!productId) {
    return reply.code(400).send({
      error: 'Bad Request',
      message: 'Missing required query parameter: productId',
      statusCode: 400
    })
  }

  const productMaterials = productMaterialService.getAllByProduct(productId)

  return reply.send(productMaterials)
}

export const updateOne = (request, reply) => {
  const data = request.body
  productMaterialService.updateOne(data)

  return reply.code(204).send()
}

export const deleteOne = (request, reply) => {
  const data = request.body
  productMaterialService.deleteOne(data)

  return reply.code(204).send()
}