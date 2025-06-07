import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Especialista from '#models/especialista'
import { DateTime } from 'luxon'

export default class EspecialistaSeeder extends BaseSeeder {
  async run() {
    await Especialista.createMany([
      {
        nombre_completo: 'Dra. Ana Torres',
        especialidad: 'Pediatría',
        registro_profesional: 'MED001',
        activo: true,
        createdAt: DateTime.now(),
      },
      {
        nombre_completo: 'Dr. Juan Méndez',
        especialidad: 'Cardiología',
        registro_profesional: 'MED002',
        activo: true,
        createdAt: DateTime.now(),
      },
      {
        nombre_completo: 'Dra. Laura Gómez',
        especialidad: 'Dermatología',
        registro_profesional: 'MED003',
        activo: true,
        createdAt: DateTime.now(),
      },
      {
        nombre_completo: 'Dr. Andrés Ramos',
        especialidad: 'Neurología',
        registro_profesional: 'MED004',
        activo: true,
        createdAt: DateTime.now(),
      },
      {
        nombre_completo: 'Dra. Camila Fuentes',
        especialidad: 'Ginecología',
        registro_profesional: 'MED005',
        activo: true,
        createdAt: DateTime.now(),
      },
      {
        nombre_completo: 'Dr. Miguel Vargas',
        especialidad: 'Urología',
        registro_profesional: 'MED006',
        activo: true,
        createdAt: DateTime.now(),
      },
      {
        nombre_completo: 'Dra. Elena Soto',
        especialidad: 'Oftalmología',
        registro_profesional: 'MED007',
        activo: true,
        createdAt: DateTime.now(),
      },
    ])
  }
}
