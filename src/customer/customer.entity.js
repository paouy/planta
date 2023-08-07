const transformToCustomerEntity = (schema) => {
  const {
    id,
    name,
    short_name
  } = schema

  const category = {
    id,
    name,
    shortName: short_name
  }

  return category
}

export {
  transformToCustomerEntity
}