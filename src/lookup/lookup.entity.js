const transformToLookupEntity = (schema) => {
  const key = schema.key.replace(/_([a-z])/g, (_, match) => match.toUpperCase())
  const type = schema.type.toLowerCase()
  let value

  if (type === 'string') {
    value = String(schema.value)
  }

  if (type === 'boolean') {
    value = Boolean(schema.value)
  }

  if (type === 'number') {
    value = Number(schema.value)
  }

  if (type === 'json') {
    value = JSON.parse(schema.value)
  }

  return {
    [key]: value
  }
}

export {
  transformToLookupEntity
}