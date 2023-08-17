const transformToWorkerEntity = (schema) => {
  const {
    id,
    public_id,
    first_name,
    last_name
  } = schema

  const worker = {
    id,
    publicId: public_id,
    firstName: first_name,
    lastName: last_name,
    name: `${last_name}, ${first_name} — ${public_id}`
  }

  return worker
}

export {
  transformToWorkerEntity
}