import { ulid } from 'ulidx'

const mapToWorkerSchema = (data) => {
  const schema = {
    id: data.id || ulid(),
    public_id: data.publicId,
    first_name: data.firstName,
    last_name: data.lastName
  }

  return schema
}

export {
  mapToWorkerSchema
}