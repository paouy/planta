import { ulid } from 'ulidx'

const mapToEquipmentSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if ('name' in data) {
    schema.name = data.name
  }

  if ('operationIds' in data) {
    schema.operation_ids = JSON.stringify(data.operationIds)
  }

  return schema
}

export {
  mapToEquipmentSchema
}