const transformToCategoryEntity = (schema) => {
  const {
    id,
    name,
    type
  } = schema

  const category = {
    id,
    name,
    type: type.toUpperCase()
  }

  return category
}

export {
  transformToCategoryEntity
}