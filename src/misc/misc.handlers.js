import * as miscService from './misc.service.js'

export const initializeApp = (request, reply) => {
  const data = miscService.initializeApp()

  return reply.send(data)
}