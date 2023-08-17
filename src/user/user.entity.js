const transformToUserEntity = (schema) => {
  const {
    id,
    first_name,
    last_name,
    username,
    password_hash,
    is_admin,
    is_disabled
  } = schema

  const user = {
    id,
    firstName: first_name,
    lastName: last_name,
    username: username,
    passwordHash: password_hash,
    isAdmin: Boolean(is_admin),
    isDisabled: Boolean(is_disabled)
  }

  return user
}

export {
  transformToUserEntity
}