import * as lookupService from './lookup.service.js'

export const get = (request, reply) => {
  const { key, keys } = request.query
  
  if (!key && !keys) {
    return reply.code(400).send({
      error: 'Bad Request',
      message: 'Missing required query parameter: key or keys',
      statusCode: 400
    })
  }

  let data

  if (key) {
    data = lookupService.getOne(key)
  }

  if (keys) {
    data = lookupService.getMany(keys.split(','))
  }

  return reply.send(data)
}