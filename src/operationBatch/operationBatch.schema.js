import { ulid } from 'ulidx'

const mapToOperationBatchSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if ('publicId' in data) {
    schema.public_id = data.publicId
  }

  if ('operationId' in data) {
    schema.operation_id = data.operationId
  }

  if (data.workstation?.id) {
    schema.workstation_id = data.workstation.id
  }

  if ('status' in data) {
    schema.status = data.status.toUpperCase()
  }

  if ('schedule' in data) {
    schema.schedule = data.schedule
  }

  if (!data.id) {
    schema.status = 'OPEN'
  }

  return schema
}

export {
  mapToOperationBatchSchema
}