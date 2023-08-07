import { ulid } from 'ulidx'

const mapToCategorySchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if ('name' in data) {
    schema.name = data.name
  }

  if ('type' in data) {
    schema.type = data.type.toUpperCase()
  }

  return schema
}

export {
  mapToCategorySchema
}