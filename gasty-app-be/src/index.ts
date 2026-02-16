import { createApp } from './infrastructure/http/app';
import { Container } from './infrastructure/di/container';
import { config } from './infrastructure/config/environment';
import { connectMongoDB } from './infrastructure/database/mongodb';

/**
 * Punto de entrada de la aplicación
 */
async function main() {
  try {
    // Conectar a MongoDB
    await connectMongoDB();

    // Crear contenedor de dependencias
    const container = new Container();

    // Crear aplicación Express
    const app = createApp(container);

    // Iniciar servidor
    const port = config.port;
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
      console.log(`📊 Health check: http://localhost:${port}/health`);
      console.log(`💰 API de gastos: http://localhost:${port}/api/expenses`);
      console.log(`🏦 API de bancos: http://localhost:${port}/api/banks`);
      console.log(`💳 API de tarjetas: http://localhost:${port}/api/cards`);
    });
  } catch (error) {
    console.error('Error al iniciar la aplicación:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error al iniciar la aplicación:', error);
  process.exit(1);
});

