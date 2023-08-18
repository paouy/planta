import * as authService from './auth.service.js'

export const login = async (request, reply) => {
  try {
    const data = request.body
    const session = await authService.login(data)

    return session
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return reply.code(401).send({
        statusCode: 401,
        error: 'Unauthorized',
        message: 'Incorrect username or password'
      })
    }
  }
}

export const updatePassword = async (request, reply) => {
  const data = request.body

  if (!request.user.isAdmin) {
    data.id = request.user.id
  }

  await authService.updatePassword(data)

  return reply.code(204).send()
}