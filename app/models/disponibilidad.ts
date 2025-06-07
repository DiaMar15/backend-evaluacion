import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Especialista from './especialista.js'
import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Disponibilidad extends BaseModel {
  public static table = 'disponibilidad'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare especialista_id: number

  @column()
  declare dia: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo'

  @column()
  declare hora_inicio: string

  @column()
  declare hora_fin: string

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime

  @column.dateTime()
  declare deleted_at?: DateTime | null

  @belongsTo(() => Especialista, {
    foreignKey: 'especialista_id',
  })
  declare especialista: BelongsTo<typeof Especialista>
}
