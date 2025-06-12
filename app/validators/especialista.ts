import vine from '@vinejs/vine'

export const especialistaValidator = vine.compile(
  vine.object({
    nombre_completo: vine.string().trim().minLength(3),
    especialidad: vine.string().trim(),
    registro_profesional: vine
      .string()
      .trim()
      .unique(async (db, value) => {
        const row = await db.from('especialistas').where('registro_profesional', value).first()
        return !row
      }),
    activo: vine.boolean().optional(),
    disponibilidades: vine
      .array(
        vine.object({
          dia: vine.string(),
          hora_inicio: vine.string(),
          hora_fin: vine.string(),
        })
      )
      .optional(),
  })
)

export const partialEspecialistaValidator = vine.compile(
  vine.object({
    nombre_completo: vine.string().trim().minLength(3).optional(),
    especialidad: vine.string().trim().optional(),
    registro_profesional: vine
      .string()
      .trim()
      .unique(async (db: any, value: string, context: vine.FieldContext) => {
        if (!value) return true
        const row = await db
          .from('especialistas')
          .where('registro_profesional', value)
          .whereNot('id', context.meta.id) // Usamos el ID desde meta
          .first()
        return !row
      })
      .optional(),
    activo: vine.boolean().optional(),
    disponibilidades: vine
      .array(
        vine.object({
          dia: vine.string(),
          hora_inicio: vine.string(),
          hora_fin: vine.string(),
        })
      )
      .optional(),
  })
)
