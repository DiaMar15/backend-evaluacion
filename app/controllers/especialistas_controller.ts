import type { HttpContext } from '@adonisjs/core/http'
import Especialista from '#models/especialista'
import { DateTime } from 'luxon'
import { especialistaValidator, partialEspecialistaValidator } from '#validators/especialista'

export default class EspecialistasController {
  async index({ response }: HttpContext) {
    const especialistas = await Especialista.query()
      .whereNull('deleted_at')
      .preload('disponibilidades')

    return response.ok(especialistas)
  }

  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(especialistaValidator)

    const especialista = await Especialista.create(data)

    if (data.disponibilidades) {
      await especialista.related('disponibilidades').createMany(
        data.disponibilidades.map((disponibilidad) => ({
          ...disponibilidad,
          dia: disponibilidad.dia as
            | 'Lunes'
            | 'Martes'
            | 'Miércoles'
            | 'Jueves'
            | 'Viernes'
            | 'Sábado'
            | 'Domingo',
        }))
      )
    }

    await especialista.load('disponibilidades')
    return response.created(especialista)
  }

  async show({ params, response }: HttpContext) {
    const especialista = await Especialista.query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .preload('disponibilidades')
      .firstOrFail()

    return response.ok(especialista)
  }

  async update({ params, request, response }: HttpContext) {
    const especialista = await Especialista.findOrFail(params.id)

    if (especialista.deletedAt) {
      return response.notFound({ message: 'Especialista eliminado' })
    }

    const data = await request.validateUsing(partialEspecialistaValidator, {
      meta: { id: especialista.id },
    })

    especialista.merge(data)
    await especialista.save()

    return response.ok(especialista)
  }

  async destroy({ params, response }: HttpContext) {
    const especialista = await Especialista.findOrFail(params.id)

    especialista.deletedAt = DateTime.now()
    await especialista.save()

    return response.ok({ message: 'Especialista eliminado correctamente' })
  }
}
