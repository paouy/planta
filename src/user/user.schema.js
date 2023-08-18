import { ulid } from 'ulidx'

const mapToUserSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if ('firstName' in data) {
    schema.first_name = data.firstName
  }

  if ('lastName' in data) {
    schema.last_name = data.lastName
  }

  if ('lastName' in data) {
    schema.last_name = data.lastName
  }

  if ('username' in data) {
    schema.username = data.username
  }

  if ('passwordHash' in data) {
    schema.password_hash = data.passwordHash
  }

  if ('isAdmin' in data) {
    schema.is_admin = Number(data.isAdmin)
  }

  if ('isDisabled' in data) {
    schema.is_disabled = Number(data.isDisabled)
  }

  if ('lastLogin' in data) {
    schema.last_login = Number(data.lastLogin)
  }

  return schema
}

export {
  mapToUserSchema
}