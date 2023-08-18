const transformToUserEntity = (schema) => {
  const {
    id,
    first_name,
    last_name,
    username,
    password_hash,
    is_admin,
    is_disabled,
    last_login
  } = schema

  const user = {
    id,
    firstName: first_name,
    lastName: last_name,
    username: username,
    isAdmin: Boolean(is_admin),
    isDisabled: Boolean(is_disabled),
    lastLogin: last_login || null
  }

  if (password_hash) {
    user.passwordHash = password_hash
  }

  return user
}

export {
  transformToUserEntity
}