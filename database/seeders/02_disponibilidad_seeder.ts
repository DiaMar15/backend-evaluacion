import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Disponibilidad from '#models/disponibilidad'

export default class DisponibilidadSeeder extends BaseSeeder {
  public async run() {
    await Disponibilidad.createMany([
      {
        especialista_id: 1,
        dia: 'Lunes',
        hora_inicio: '08:00:00',
        hora_fin: '12:00:00',
      },
      {
        especialista_id: 1,
        dia: 'Miércoles',
        hora_inicio: '14:00:00',
        hora_fin: '18:00:00',
      },
      {
        especialista_id: 2,
        dia: 'Martes',
        hora_inicio: '09:00:00',
        hora_fin: '13:00:00',
      },
      {
        especialista_id: 3,
        dia: 'Viernes',
        hora_inicio: '10:00:00',
        hora_fin: '15:00:00',
      },
      {
        especialista_id: 4,
        dia: 'Jueves',
        hora_inicio: '08:30:00',
        hora_fin: '12:30:00',
      },
      {
        especialista_id: 5,
        dia: 'Sábado',
        hora_inicio: '09:00:00',
        hora_fin: '14:00:00',
      },
      {
        especialista_id: 6,
        dia: 'Lunes',
        hora_inicio: '13:00:00',
        hora_fin: '17:00:00',
      },
    ])
  }
}
