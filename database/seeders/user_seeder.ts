import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.create({
      nombre: 'adso',
      apellido: 'noche',
      correo: 'adso@example.com',
      celular: '123456789',
      password: '1234',
    })
  }
}
