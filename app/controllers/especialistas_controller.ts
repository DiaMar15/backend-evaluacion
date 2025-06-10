import type { HttpContext } from '@adonisjs/core/http'
import Especialista from '#models/especialista'
import { DateTime } from 'luxon'
import { especialistaValidator, partialEspecialistaValidator } from '#validators/especialista'

export default class EspecialistasController {
  // Obtener todos los especialistas activos e inactivos (según deleted_at)
  async index({ response }: HttpContext) {
    const especialistas = await Especialista.query().preload('disponibilidades')
    return response.ok(especialistas)
  }

  // Crear un nuevo especialista con disponibilidades
  async store({ request, response }: HttpContext) {
    const data = await request.validateUsing(especialistaValidator)

    const especialista = await Especialista.create({ ...data, activo: true })

    if (data.disponibilidades) {
      await especialista.related('disponibilidades').createMany(
        data.disponibilidades.map((d) => ({
          ...d,
          dia: d.dia as
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

  // Obtener un especialista por ID (solo si no está eliminado)
  async show({ params, response }: HttpContext) {
    const especialista = await Especialista.query()
      .where('id', params.id)
      .preload('disponibilidades')
      .firstOrFail()

    return response.ok(especialista)
  }

  // Actualizar un especialista
  async update({ params, request, response }: HttpContext) {
    const especialista = await Especialista.findOrFail(params.id)

    const data = await request.validateUsing(partialEspecialistaValidator, {
      meta: { id: especialista.id },
    })

    especialista.merge(data)
    await especialista.save()

    await especialista.load('disponibilidades')
    return response.ok(especialista)
  }

  // Soft delete (marcar como eliminado e inactivo)
  async destroy({ params, response }: HttpContext) {
    const especialista = await Especialista.findOrFail(params.id)

    especialista.deleted_at = DateTime.now()
    especialista.activo = false
    await especialista.save()

    return response.ok({ message: 'Especialista marcado como inactivo' })
  }

  // Eliminación permanente (solo desde frontend, bajo confirmación)
  async forceDelete({ params, response }: HttpContext) {
    const especialista = await Especialista.findOrFail(params.id)

    await especialista.delete() // elimina de la base de datos
    return response.ok({ message: 'Especialista eliminado permanentemente' })
  }
}
