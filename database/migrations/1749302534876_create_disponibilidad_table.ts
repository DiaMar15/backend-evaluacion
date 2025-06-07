import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'disponibilidad'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('especialista_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('especialistas')
        .onDelete('RESTRICT')

      table
        .enu('dia', ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'])
        .notNullable()

      table.time('hora_inicio').notNullable()
      table.time('hora_fin').notNullable()

      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable()
      table.timestamp('deleted_at').nullable()

      table.index(['especialista_id', 'dia'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
