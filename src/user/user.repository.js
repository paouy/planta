import { sql, setValues } from '../sqlite.js'
import { mapToUserSchema } from './user.schema.js'

const insertOne = (data) => {
  data = mapToUserSchema(data)

  const statement = sql(`
    insert into
      users (
        id,
        first_name,
        last_name,
        username,
        password_hash,
        is_admin
      )
      values (
        @id,
        @first_name,
        @last_name,
        @username,
        @password_hash,
        @is_admin
      )
    returning
      id,
      first_name,
      last_name,
      is_admin,
      is_disabled
  `)
  
  const result = statement.get(data)

  return result
}

const findOne = (id) => {
  const statement = sql('select * from users where id = ?')
  const result = statement.get(id)

  return result
}

const findOneByUsername = (username) => {
  const statement = sql('select * from users where username = ?')
  const result = statement.get(username)

  return result
}

const findAll = () => {
  const statement = sql(`
    select
      id,
      first_name,
      last_name,
      is_admin,
      is_disabled,
      last_login
    from
      users
    order by
      last_name,
      first_name
  `)

  const results = statement.all()

  return results
}

const updateOne = (data) => {
  data = mapToUserSchema(data)

  const statement = sql(`update users ${setValues(data)} where id = @id`)
  const result = statement.run(data)

  return result
}

const deleteOne = (id) => {
  const statement = sql('delete from users where id = ?')
  const result = statement.run(id)

  return result
}

export const createUserRepository = () => {
  return {
    insertOne,
    findOne,
    findOneByUsername,
    findAll,
    updateOne,
    deleteOne
  }
}