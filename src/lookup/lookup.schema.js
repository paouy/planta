const mapToLookupSchema = (data) => {
  const schema = {}

  if (data.key) {
    schema.key = data.key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)
  }

  if (data.value) {
    schema.value = data.value
  }

  if (data.type) {
    schema.type = data.type.toUpperCase()
  }

  return schema
}

export {
  mapToLookupSchema
}