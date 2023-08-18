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

export const changePassword = async (request, reply) => {
  const data = request.body

  if (!request.user.isAdmin) {
    data.id = request.user.id
  } else {
    data.id = data.id || request.user.id
    data.adminId = request.user.id
  }


  await authService.changePassword(data)

  return reply.code(204).send()
}