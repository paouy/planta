import { DB_PATH } from './config.js'
import Database from 'better-sqlite3'

const db = new Database(DB_PATH)
const sql = db.prepare.bind(db)
const txn = db.transaction.bind(db)

const setValues = (data) => {
  const columns = Object.keys(data).filter(key => key !== 'id')

  return `set ${columns.map(col => `${col} = @${col}`).join(', ')}`
}

const initialized = db.prepare(`
  select
    count(*) as count
  from
    sqlite_master
  where
    type = 'table'
  and
    name = 'users'
`).get().count

if (!initialized) {
  db.exec(`
    begin transaction;

    create table if not exists 'categories' (
      'id' text,
      'name' text not null,
      'type' text not null,
      primary key('id')
    );

    create table if not exists 'equipments' (
      'id' text,
      'name' text not null,
      'operation_ids' text not null,
      primary key('id')
    );

    create table if not exists 'materials' (
      'id' text,
      'category_id' text,
      'sku' text not null,
      'name' text not null,
      'uom' text not null,
      'qty_available' numeric not null,
      foreign key('category_id') references 'categories'('id') on delete set null,
      primary key('id')
    );

    create table if not exists 'product_materials' (
      'product_id' text not null,
      'material_id' text not null,
      'qty' numeric not null,
      foreign key('material_id') references 'materials'('id') on delete cascade,
      foreign key('product_id') references 'products'('id') on delete cascade
    );

    create table if not exists 'customers' (
      'id' text,
      'name' text not null,
      'short_name' text not null,
      primary key('id')
    );

    create table if not exists 'fulfillments' (
      'id' text,
      'sales_order_item_id' text not null,
      'qty' numeric not null,
      foreign key('sales_order_item_id') references 'sales_order_items'('id') on delete cascade,
      primary key('id')
    );

    create table if not exists 'workstations' (
      'id' text,
      'name' text not null,
      'operation_id' text not null,
      foreign key('operation_id') references 'operations'('id') on delete cascade,
      primary key('id')
    );

    create table if not exists 'jobs' (
      'id' text,
      'production_order_id' text not null,
      'operation_id' text not null,
      'workstation_id' text,
      'status' text not null default 'OPEN',
      'qty_output' numeric not null default 0,
      'qty_reject' numeric not null default 0,
      'qty_rework' numeric not null default 0,
      'time_taken_mins' numeric not null default 0,
      'seq' numeric not null,
      'qty_shortfall' numeric not null default 0,
      foreign key('production_order_id') references 'production_orders'('id') on delete cascade,
      primary key('id'),
      foreign key('operation_id') references 'operations'('id') on delete cascade,
      foreign key('workstation_id') references 'workstations'('id') on delete set null
    );

    create table if not exists 'allocations' (
      'sales_order_item_id' text not null,
      'qty' numeric not null,
      'is_committed' integer not null default 0,
      foreign key('sales_order_item_id') references 'sales_order_items'('id') on delete cascade
    );

    create table if not exists 'operation_batch_jobs' (
      'operation_batch_id' text not null,
      'job_id' text not null,
      foreign key('operation_batch_id') references 'operation_batches'('id') on delete cascade,
      foreign key('job_id') references 'jobs'('id') on delete cascade
    );

    create table if not exists 'sales_order_items' (
      'id' text,
      'sales_order_id' text not null,
      'product_id' text not null,
      'qty' numeric not null,
      'public_id' text,
      foreign key('sales_order_id') references 'sales_orders'('id') on delete cascade,
      foreign key('product_id') references 'products'('id') on delete cascade,
      primary key('id')
    );

    create table if not exists 'operations' (
      'id' text,
      'name' text not null,
      'seq' integer not null,
      'time_per_cycle_mins' numeric not null,
      'allows_rework' integer not null,
      'is_batch' integer not null,
      'batch_size_parameter' text,
      primary key('id')
    );

    create table if not exists 'lookup' (
      'key' text not null,
      'value' text,
      'type' text not null,
      primary key('key')
    );

    create table if not exists 'operation_batches' (
      'id' text,
      'public_id' text not null UNIQUE,
      'operation_id' text not null,
      'workstation_id' text not null,
      'status' text not null,
      'schedule' text not null,
      foreign key('workstation_id') references 'workstations'('id') on delete cascade,
      primary key('id'),
      foreign key('operation_id') references 'operations'('id') on delete cascade
    );

    create table if not exists 'production_orders' (
      'id' text,
      'public_id' text UNIQUE,
      'product_id' text not null,
      'status' text not null default 'OPEN',
      'qty' numeric not null,
      'priority' numeric not null,
      'due_date' text,
      'is_released' integer not null default 0,
      'sales_order_item_id' text,
      foreign key('product_id') references 'products'('id') on delete cascade,
      primary key('id'),
      foreign key('sales_order_item_id') references 'sales_order_items'('id') on delete cascade
    );

    create table if not exists 'sales_orders' (
      'id' text,
      'public_id' text not null UNIQUE,
      'customer_id' text not null,
      'date' text not null,
      'status' text not null,
      'is_archived' integer not null default 0,
      foreign key('customer_id') references 'customers'('id') on delete cascade,
      primary key('id')
    );

    create table if not exists 'workers' (
      'id' text,
      'public_id' text not null,
      'first_name' text not null,
      'last_name' text not null,
      primary key('id')
    );

    create table if not exists 'users' (
      'id' text,
      'first_name' text not null,
      'last_name' text not null,
      'username' text not null UNIQUE,
      'password_hash' text not null,
      'is_admin' integer not null default 0,
      'is_disabled' integer not null default 0,
      'last_login' integer,
      primary key('id')
    );

    create table if not exists 'metafields' (
      'id' text,
      'name' text not null,
      'type' text not null,
      'resource' text not null,
      'attributes' text not null,
      primary key('id')
    );

    create table if not exists 'products' (
      'id' text,
      'category_id' text,
      'sku' text not null,
      'name' text not null,
      'operation_ids' text not null,
      'uom' text not null,
      'qty_available' numeric not null,
      'meta' text,
      foreign key('category_id') references 'categories'('id') on delete set null,
      primary key('id')
    );

    create table if not exists 'production_records' (
      'id' text,
      'production_order_id' text not null,
      'operation_id' text not null,
      'workstation_id' text,
      'equipment_id' text,
      'type' text not null,
      'qty' numeric not null,
      'time_taken_mins' numeric not null default 0,
      'worker_id' text,
      'meta' text,
      foreign key('equipment_id') references 'equipments'('id') on delete set null,
      foreign key('operation_id') references 'operations'('id') on delete cascade,
      foreign key('production_order_id') references 'production_orders'('id') on delete cascade,
      foreign key('workstation_id') references 'workstations'('id') on delete set null,
      primary key('id'),
      foreign key('worker_id') references 'workers'('id') on delete set null
    )

    insert into 'lookup' ('key','value','type') values 
    ('organization_name','GICA Abrasives','STRING'),
    ('released_production_order_count','0','NUMBER'),
    ('archived_sales_order_count','0','NUMBER'),
    ('last_production_order_public_id','','STRING'),
    ('last_sales_order_public_id','','STRING');

    insert into 'users' ('id','first_name','last_name','username','password_hash','is_admin','is_disabled','last_login') values
    ('01H823FBJ3TX61V8BKDZFY825H','Geoff','Tan','admin','$2a$10$rq.41MlEn43j9.zxzRKtc.LX9YayanYF1xShSZKlOGkagDWILAE2i',1,0,null);

    commit;
  `)
}

export {
  sql,
  txn,
  setValues
}