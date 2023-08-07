import { ulid } from 'ulidx'

const mapToWorkstationSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if ('name' in data) {
    schema.name = data.name
  }

  if (data.operation?.id) {
    schema.operation_id = data.operation.id
  }

  return schema
}

export {
  mapToWorkstationSchema
}