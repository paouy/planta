import { ulid } from 'ulidx'

const mapToMetafieldSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if (data.name) {
    schema.name = data.name
  }

  if (data.type) {
    schema.type = data.type.toUpperCase()
  }

  if (data.resource) {
    schema.resource = data.resource.replaceAll(' ', '_').toUpperCase()
  }

  if (data.attributes) {
    schema.attributes = JSON.stringify(data.attributes)
  }

  if (data.position) {
    schema.position = Number(data.position)
  }

  return schema
}

export {
  mapToMetafieldSchema
}