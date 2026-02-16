import mongoose from 'mongoose';
import { config } from '../config/environment';

/**
 * Conecta a MongoDB usando Mongoose
 */
export async function connectMongoDB(): Promise<void> {
  try {
    const mongoUri = config.mongodbUri;
    
    await mongoose.connect(mongoUri);
    
    console.log('✅ Conectado a MongoDB:', mongoUri);
  } catch (error) {
    console.error('❌ Error al conectar a MongoDB:', error);
    throw error;
  }
}

/**
 * Desconecta de MongoDB
 */
export async function disconnectMongoDB(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log('✅ Desconectado de MongoDB');
  } catch (error) {
    console.error('❌ Error al desconectar de MongoDB:', error);
    throw error;
  }
}

