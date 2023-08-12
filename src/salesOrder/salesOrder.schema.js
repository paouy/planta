import { ulid } from 'ulidx'

const mapToSalesOrderSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if ('publicId' in data) {
    schema.public_id = data.publicId
  }

  if (data.customer?.id) {
    schema.customer_id = data.customer.id
  }

  if ('date' in data) {
    schema.date = data.date
  }

  if ('status' in data) {
    schema.status = data.status.toUpperCase()
  }

  if (!data.id) {
    schema.status = 'OPEN'
  }

  return schema
}

export {
  mapToSalesOrderSchema
}