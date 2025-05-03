const mongoose = require('mongoose');

// URI de conexión a MongoDB
const URI = 'mongodb://localhost:27017/empleados';

mongoose.connect(URI)
  .then(() => console.log('DB is connected'))
  .catch(err => console.error('Error connecting to DB:', err));

// Manejo de eventos de desconexión
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

// Exportar mongoose para usarlo en otros archivos
module.exports = mongoose;
