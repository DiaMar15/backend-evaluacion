import type { HttpContext } from '@adonisjs/core/http'
import Especialista from '#models/especialista'
import { especialistaValidator, partialEspecialistaValidator } from '#validators/especialista'

export default class EspecialistasController {
  async index() {
    return await Especialista.query().preload('disponibilidades')
  }

  async store({ request }: HttpContext) {
    const data = await request.validateUsing(especialistaValidator)
    const especialista = await Especialista.create(data)

    if (data.disponibilidades) {
      await especialista.related('disponibilidades').createMany(data.disponibilidades)
    }

    await especialista.load('disponibilidades')
    return especialista
  }

  async show({ params }: HttpContext) {
    return await Especialista.query()
      .where('id', params.id)
      .preload('disponibilidades')
      .firstOrFail()
  }

  async update({ request, params }: HttpContext) {
    const especialista = await Especialista.findOrFail(params.id)

    const data = await request.validateUsing(partialEspecialistaValidator, {
      meta: { id: params.id }, // <<--- Pasamos el ID aquí
    })

    especialista.merge(data)
    await especialista.save()

    if (data.disponibilidades) {
      await especialista.related('disponibilidades').query().delete()
      await especialista.related('disponibilidades').createMany(data.disponibilidades)
    }

    await especialista.load('disponibilidades')
    return especialista
  }

  async destroy({ params }: HttpContext) {
    const especialista = await Especialista.findOrFail(params.id)

    // Elimina disponibilidades relacionadas
    await especialista.related('disponibilidades').query().delete()

    // Luego elimina el especialista
    await especialista.delete()

    return { message: 'Especialista eliminado correctamente' }
  }
}
