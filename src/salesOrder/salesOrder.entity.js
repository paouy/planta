const transformToSalesOrderEntity = (schema) => {
  const {
    id,
    public_id,
    customer_id,
    date,
    status,
    customer_short_name,
    item_count
  } = schema

  const salesOrder = {
    id,
    publicId: public_id,
    customer: {
      id: customer_id
    },
    date,
    status
  }

  if (customer_short_name) {
    salesOrder.customer.shortName = customer_short_name
  }

  if (item_count) {
    salesOrder.itemCount = Number(item_count)
  }

  return salesOrder
}

export {
  transformToSalesOrderEntity
}