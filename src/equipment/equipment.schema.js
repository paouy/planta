import { ulid } from 'ulidx'

const mapToEquipmentSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if ('name' in data) {
    schema.name = data.name
  }

  if ('operation_ids' in data) {
    schema.operation_ids = JSON.stringify(data.operation_ids)
  }

  return schema
}

export {
  mapToEquipmentSchema
}