const transformToEquipmentEntity = (schema) => {
  const {
    id,
    name,
    operation_ids
  } = schema

  const equipment = {
    id,
    name,
    operationIds: JSON.parse(operation_ids)
  }

  return equipment
}

export {
  transformToEquipmentEntity
}