import { ulid } from 'ulidx'

const mapToCustomerSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if ('name' in data) {
    schema.name = data.name
  }

  if ('shortName' in data) {
    schema.short_name = data.shortName
  }

  return schema
}

export {
  mapToCustomerSchema
}