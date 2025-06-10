Backend Evaluación
Repositorio que contiene el backend para el sistema de evaluación.


Diana Marcela Martínez

@DiaMar15

Tecnologías utilizadas
Node.js

AdonisJS (v5)

Mysql

Requisitos previos
Node.js v18 o superior

npm

Git

Instalación
Clona el repositorio:

git clone https://github.com/DiaMar15/backend-evaluacion.git

cd backend-evaluacion

Instala las dependencias:
npm install

Copia el archivo de entorno y edítalo si es necesario:

cp .env.example
.env
Genera la clave de la aplicación:

node ace generate:key
Configura la base de datos en el archivo .env.


DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=secret
DB_DATABASE=evaluacion_db

Ejecuta las migraciones:
node ace migration:run

(Opcional) Poblar la base de datos con datos de prueba:
node ace db:seed

🏁 Ejecutar el servidor
npm run dev

El servidor se ejecutará en:
http://localhost:3333

