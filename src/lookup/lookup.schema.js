const mapToLookupSchema = (data) => {
  const camelToSnake = (camelCaseString) => {
    return camelCaseString.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)
  }

  const schema = {}

  if (data.key) {
    schema.key = camelToSnake(data.key)
  }

  if (data.value) {
    schema.value = data.value
  }

  return schema
}

export {
  mapToLookupSchema
}