import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Disponibilidad from './disponibilidad.js'
import { DateTime } from 'luxon'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Especialista extends BaseModel {
  public static table = 'especialistas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre_completo: string

  @column()
  declare especialidad: string

  @column()
  declare registro_profesional: string

  @column()
  declare activo: boolean

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @column.dateTime()
  declare deleted_at?: DateTime | null

  @hasMany(() => Disponibilidad, {
    foreignKey: 'especialista_id', // clave foránea en Disponibilidad
  })
  declare disponibilidades: HasMany<typeof Disponibilidad>
}
