const transformToWorkstationEntity = (schema) => {
  const {
    id,
    name,
    operation_id,
    operation_name
  } = schema

  const workstation = {
    id,
    name,
    operation: {
      id: operation_id
    }
  }

  if (operation_name) {
    workstation.operation.name = operation_name
  }

  return workstation
}

export {
  transformToWorkstationEntity
}