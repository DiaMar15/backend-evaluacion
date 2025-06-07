/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
const AuthController = () => import('#controllers/auth_controller')
const DashboardController = () => import('#controllers/dashboard_controller')
const DisponibilidadController = () => import('#controllers/disponibilidad_controller')
const EspecialistasController = () => import('#controllers/especialistas_controller')
const IniciosController = () => import('#controllers/inicios_controller')

router.get('/', async () => {
  return {
    hello: 'world',
  }
})
router.get('/inicio', [DashboardController, 'index']).use(
  middleware.auth({
    guards: ['api'],
  })
)

router.get('dashboard', [IniciosController, 'index'])

router.post('/login', [AuthController, 'login'])

router
  .group(() => {
    router.get('/', [EspecialistasController, 'index'])
    router.post('/', [EspecialistasController, 'store'])
    router.get('/:id', [EspecialistasController, 'show'])
    router.put('/:id', [EspecialistasController, 'update'])
    router.patch('/:id', [EspecialistasController, 'update'])
    router.delete('/:id', [EspecialistasController, 'destroy'])
  })
  .prefix('/especialistas')
middleware.auth({
  guards: ['api'],
})

router
  .group(() => {
    router.get('/', [DisponibilidadController, 'index'])
    router.post('/', [DisponibilidadController, 'store'])
    router.get('/:id', [DisponibilidadController, 'show'])
    router.put('/:id', [DisponibilidadController, 'update'])
    router.patch('/:id', [DisponibilidadController, 'update'])
    router.delete('/:id', [DisponibilidadController, 'destroy'])
  })
  .prefix('/disponibilidades')
middleware.auth({
  guards: ['api'],
})
