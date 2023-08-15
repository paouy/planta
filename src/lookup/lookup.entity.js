const transformToLookupEntity = (schema) => {
  const type = schema.type.toLowerCase()
  let value

  if (type === 'string') {
    value = String(value)
  }

  if (type === 'boolean') {
    value = Boolean(value)
  }

  if (type === 'number') {
    value = Number(value)
  }

  if (type === 'json') {
    value = JSON.parse(value)
  }

  return value
}

export {
  transformToLookupEntity
}