import { ulid } from 'ulidx'

const mapToOperationSchema = (data) => {
  const schema = {
    id: data.id || ulid()
  }

  if ('name' in data) {
    schema.name = data.name
  }

  if ('seq' in data) {
    schema.seq = Number(data.seq)
  }

  if ('timePerCycleMins' in data) {
    schema.time_per_cycle_mins = Number(data.timePerCycleMins)
  }

  if ('allowsRework' in data) {
    schema.allows_rework = Number(data.allowsRework)
  }

  if ('isBatch' in data) {
    schema.is_batch = Number(data.isBatch)
  }

  if ('batchSizeParameter' in data) {
    schema.batch_size_parameter = data.batchSizeParameter
  }

  console.log(JSON.stringify(schema, null, 2))

  return schema
}

export {
  mapToOperationSchema
}