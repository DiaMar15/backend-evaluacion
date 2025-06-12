import vine from '@vinejs/vine'

export const disponibilidadValidator = vine.compile(
  vine.object({
    especialista_id: vine.number().exists(async (db, value) => {
      const row = await db.from('especialistas').where('id', value).first()
      return !!row
    }),

    dia: vine.string(),
    hora_inicio: vine.string().regex(/^\d{2}:\d{2}$/), // HH:MM
    hora_fin: vine.string().regex(/^\d{2}:\d{2}$/), // HH:MM
  })
)

export const partialDisponibilidadValidator = vine.compile(
  vine.object({
    especialista_id: vine
      .number()
      .exists(async (db, value) => {
        const row = await db.from('especialistas').where('id', value).first()
        return !!row
      })
      // Removed unsupported 'meta' method
      .optional(),

    dia: vine
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional(),
    hora_inicio: vine
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .optional(),
    hora_fin: vine
      .string()
      .regex(/^\d{2}:\d{2}$/)
      .optional(),
  })
)
