# Gasty App Backend

Backend de Gasty App implementado con **Arquitectura Hexagonal** (Ports and Adapters) en TypeScript usando Node.js y Express.

## 🏗️ Arquitectura Hexagonal

Este proyecto sigue los principios de la Arquitectura Hexagonal, que separa la lógica de negocio de los detalles de implementación:

```
src/
├── domain/              # Capa de Dominio (Núcleo)
│   ├── entities/        # Entidades de negocio
│   └── repositories/    # Interfaces (Puertos) de repositorios
│
├── application/         # Capa de Aplicación
│   └── use-cases/       # Casos de uso (lógica de aplicación)
│
├── adapters/            # Adaptadores
│   ├── http/            # Adaptadores primarios (Driving Adapters)
│   │   ├── controllers/ # Controladores HTTP
│   │   └── routes/      # Rutas HTTP
│   └── persistence/     # Adaptadores secundarios (Driven Adapters)
│       └── repositories/ # Implementaciones de repositorios
│
└── infrastructure/      # Infraestructura
    ├── config/          # Configuración
    ├── di/              # Inyección de dependencias
    └── http/            # Configuración de Express
```

## 📦 Estructura de Capas

### 1. **Domain (Dominio)**
Contiene la lógica de negocio pura, sin dependencias externas:
- **Entities**: Entidades del dominio (Expense, Bank, etc.)
- **Repositories (Ports)**: Interfaces que definen contratos para persistencia

### 2. **Application (Aplicación)**
Contiene los casos de uso que orquestan la lógica de negocio:
- **Use Cases**: Operaciones específicas del negocio (CreateExpense, GetExpenses, etc.)

### 3. **Adapters (Adaptadores)**
Implementaciones concretas que conectan el núcleo con el mundo exterior:

#### Adaptadores Primarios (Driving Adapters)
- **HTTP Controllers**: Convierten peticiones HTTP en llamadas a casos de uso
- **HTTP Routes**: Define las rutas de la API

#### Adaptadores Secundarios (Driven Adapters)
- **Persistence Repositories**: Implementan las interfaces de repositorio (actualmente en memoria, fácilmente reemplazables por bases de datos)

### 4. **Infrastructure (Infraestructura)**
Configuración y utilidades:
- **Config**: Variables de entorno y configuración
- **DI Container**: Contenedor de inyección de dependencias
- **HTTP App**: Configuración de Express

## 🚀 Instalación

```bash
# Instalar dependencias
npm install

# O con yarn
yarn install
```

## 🗄️ Configuración de MongoDB

El proyecto usa MongoDB con Mongoose para la persistencia de datos.

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto backend:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/gasty-app
```

### Instalar MongoDB

**Opción 1: MongoDB Local**
```bash
# macOS (con Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Iniciar MongoDB
brew services start mongodb-community
```

**Opción 2: MongoDB Atlas (Cloud)**
- Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Crea un cluster gratuito
- Obtén la connection string y úsala como `MONGODB_URI`

**Opción 3: Docker**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 🛠️ Scripts

```bash
# Desarrollo (con hot reload)
npm run dev

# Compilar TypeScript
npm run build

# Ejecutar en producción
npm start

# Linting
npm run lint

# Tests
npm test
```

## 📡 Endpoints de la API

### Health Check
```
GET /health
```

### Gastos (Expenses)
```
POST   /api/expenses      # Crear un gasto
GET    /api/expenses      # Obtener todos los gastos
GET    /api/expenses/:id  # Obtener un gasto por ID
```

### Bancos (Banks)
```
POST   /api/banks         # Crear un banco
GET    /api/banks         # Obtener todos los bancos
```

### Tarjetas (Cards)
```
POST   /api/cards              # Crear una tarjeta
GET    /api/cards              # Obtener todas las tarjetas
GET    /api/cards/:id          # Obtener una tarjeta por ID
GET    /api/cards/bank/:bankId # Obtener tarjetas por ID de banco
```

## 📝 Ejemplos de Uso

### Crear un gasto
```bash
curl -X POST http://localhost:3000/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 1500,
    "description": "Compra en supermercado",
    "category": "Alimentación",
    "date": "2024-01-15",
    "bankId": "bank-123"
  }'
```

### Crear un banco
```bash
curl -X POST http://localhost:3000/api/banks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Banco Nación",
    "balance": 50000
  }'
```

### Crear una tarjeta
```bash
curl -X POST http://localhost:3000/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "bankId": "bank-123",
    "name": "Visa Santander",
    "type": "visa",
    "lastFourDigits": "1234",
    "color": "#E31837"
  }'
```

## 🔄 Ventajas de la Arquitectura Hexagonal

1. **Desacoplamiento**: La lógica de negocio no depende de frameworks o bases de datos
2. **Testabilidad**: Fácil de testear mediante mocks de los puertos
3. **Flexibilidad**: Fácil cambiar de base de datos o framework sin afectar el dominio
4. **Mantenibilidad**: Código organizado y fácil de entender
5. **Escalabilidad**: Fácil agregar nuevos casos de uso y adaptadores

## 🏗️ Arquitectura de Persistencia

El proyecto usa **MongoDB con Mongoose** para la persistencia. Los repositorios están implementados en:
- `src/adapters/persistence/mongodb/` - Repositorios MongoDB
- `src/adapters/persistence/mongodb/models/` - Modelos de Mongoose

Los repositorios implementan las interfaces definidas en `src/domain/repositories/`, siguiendo el principio de inversión de dependencias de la arquitectura hexagonal.

## 🔮 Próximos Pasos

- [x] Agregar base de datos real (MongoDB)
- [ ] Implementar autenticación y autorización
- [ ] Agregar validación de datos con esquemas
- [ ] Implementar logging y manejo de errores robusto
- [ ] Agregar tests unitarios e integración
- [ ] Documentación con Swagger/OpenAPI

## 📚 Referencias

- [Arquitectura Hexagonal - Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

