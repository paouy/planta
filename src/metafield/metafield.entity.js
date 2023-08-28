const transformToMetafieldEntity = (schema) => {
  const {
    id,
    name,
    key,
    type,
    resource,
    attributes
  } = schema

  const metafield = {
    id,
    name,
    key,
    type,
    resource,
    attributes: JSON.parse(attributes)
  }

  return metafield
}

export {
  transformToMetafieldEntity
}