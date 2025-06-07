import type { HttpContext } from '@adonisjs/core/http'
import Disponibilidad from '#models/disponibilidad'
import { DateTime } from 'luxon'
import { disponibilidadValidator, partialDisponibilidadValidator } from '#validators/disponibilidad'
import validator from 'validator'

export default class DisponibilidadController {
  async index({ response }: HttpContext) {
    const disponibilidades = await Disponibilidad.query()
      .whereNull('deleted_at')
      .preload('especialista')

    return response.ok(disponibilidades)
  }

  async store({ request, response }: HttpContext) {
    const data = await validator.validate({
      schema: disponibilidadValidator,
      data: request.body(),
    })

    if (data.hora_inicio >= data.hora_fin) {
      return response.badRequest({
        message: 'La hora de fin debe ser mayor que la hora de inicio',
      })
    }

    const disponibilidad = await Disponibilidad.create(data)
    await disponibilidad.load('especialista')

    return response.created(disponibilidad)
  }

  async show({ params, response }: HttpContext) {
    const disponibilidad = await Disponibilidad.query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .preload('especialista')
      .firstOrFail()

    return response.ok(disponibilidad)
  }

  async update({ params, request, response }: HttpContext) {
    const disponibilidad = await Disponibilidad.findOrFail(params.id)

    if (disponibilidad.deleted_at) {
      return response.notFound({ message: 'Disponibilidad eliminada' })
    }

    const data = await request.validate({ schema: partialDisponibilidadValidator })

    if (data.hora_inicio && data.hora_fin && data.hora_inicio >= data.hora_fin) {
      return response.badRequest({
        message: 'La hora de fin debe ser mayor que la hora de inicio',
      })
    }

    disponibilidad.merge(data)
    await disponibilidad.save()
    await disponibilidad.load('especialista')

    return response.ok(disponibilidad)
  }

  async destroy({ params, response }: HttpContext) {
    const disponibilidad = await Disponibilidad.findOrFail(params.id)

    disponibilidad.deleted_at = DateTime.now()
    await disponibilidad.save()

    return response.ok({ message: 'Disponibilidad eliminada (soft delete)' })
  }
}
