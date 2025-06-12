import type { HttpContext } from '@adonisjs/core/http'
import Disponibilidad from '#models/disponibilidad'
import { DateTime } from 'luxon'
import { disponibilidadValidator, partialDisponibilidadValidator } from '#validators/disponibilidad'

export default class DisponibilidadesController {
  // Listar todas las disponibilidades activas (no eliminadas)
  async index({ response }: HttpContext) {
    const disponibilidades = await Disponibilidad.query()
      .whereNull('deleted_at')
      .preload('especialista')

    return response.ok(disponibilidades)
  }

  // Crear una nueva disponibilidad
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(disponibilidadValidator)

    if (data.hora_inicio >= data.hora_fin) {
      return response.badRequest({
        message: 'La hora de fin debe ser mayor que la hora de inicio',
      })
    }

    const disponibilidad = await Disponibilidad.create({
      ...data,
      dia: data.dia as
        | 'Lunes'
        | 'Martes'
        | 'Miércoles'
        | 'Jueves'
        | 'Viernes'
        | 'Sábado'
        | 'Domingo',
    })

    await disponibilidad.load('especialista')

    return response.created(disponibilidad)
  }

  // Mostrar una disponibilidad específica
  async show({ params, response }: HttpContext) {
    const disponibilidad = await Disponibilidad.query()
      .where('id', params.id)
      .whereNull('deleted_at')
      .preload('especialista')
      .firstOrFail()

    return response.ok(disponibilidad)
  }

  // Actualizar una disponibilidad
  async update({ params, request, response }: HttpContext) {
    const disponibilidad = await Disponibilidad.findOrFail(params.id)

    if (disponibilidad.deleted_at) {
      return response.notFound({ message: 'Disponibilidad eliminada' })
    }

    const data = await request.validateUsing(partialDisponibilidadValidator)

    if (data.hora_inicio && data.hora_fin && data.hora_inicio >= data.hora_fin) {
      return response.badRequest({
        message: 'La hora de fin debe ser mayor que la hora de inicio',
      })
    }

    if (
      data.dia &&
      !['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].includes(data.dia)
    ) {
      return response.badRequest({ message: 'El día no es válido' })
    }

    if (data.dia) {
      data.dia = data.dia as
        | 'Lunes'
        | 'Martes'
        | 'Miércoles'
        | 'Jueves'
        | 'Viernes'
        | 'Sábado'
        | 'Domingo'
    }
    disponibilidad.merge({
      ...data,
      dia: data.dia as
        | 'Lunes'
        | 'Martes'
        | 'Miércoles'
        | 'Jueves'
        | 'Viernes'
        | 'Sábado'
        | 'Domingo'
        | undefined,
    })
    await disponibilidad.save()
    await disponibilidad.load('especialista')

    return response.ok(disponibilidad)
  }

  // Soft delete
  async destroy({ params, response }: HttpContext) {
    const disponibilidad = await Disponibilidad.findOrFail(params.id)

    disponibilidad.deleted_at = DateTime.now()
    await disponibilidad.save()

    return response.ok({ message: 'Disponibilidad eliminada (soft delete)' })
  }

  // Eliminación permanente (opcional)
  async forceDelete({ params, response }: HttpContext) {
    const disponibilidad = await Disponibilidad.findOrFail(params.id)
    await disponibilidad.delete()

    return response.ok({ message: 'Disponibilidad eliminada permanentemente' })
  }
}
