const transformToEquipmentEntity = (schema) => {
  const {
    id,
    name,
    operation_ids
  } = schema

  const operation = {
    id,
    name,
    operation_ids: JSON.parse(operation_ids)
  }

  return operation
}

export {
  transformToEquipmentEntity
}