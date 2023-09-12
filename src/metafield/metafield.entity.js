const transformToMetafieldEntity = (schema) => {
  const {
    id,
    name,
    key,
    type,
    resource,
    attributes,
    position
  } = schema

  const metafield = {
    id,
    name,
    key,
    type,
    resource,
    attributes: JSON.parse(attributes),
    position: Number(position)
  }

  return metafield
}

export {
  transformToMetafieldEntity
}