/**
 * Entidad base que contiene propiedades comunes para todas las entidades del dominio
 */
export abstract class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  updateTimestamp(): void {
    this.updatedAt = new Date();
  }
}

