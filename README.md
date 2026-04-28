# Memorize Evolutivo - Juego Colaborativo de Memoria

Proyecto full-stack separado en **frontend** (React + Vite) y **backend** (Express + Socket.IO) con WebSockets para comunicación en tiempo real.

## 📁 Estructura del Proyecto

```
Proyecto/
├── frontend/              # React + TypeScript + Vite (puerto 5174)
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── vite.config.ts
│   ├── tsconfig.json
│   └── package.json
├── backend/               # Express + Socket.IO (puerto 5176)
│   ├── index.js          # Servidor principal
│   ├── e2e-test.mjs      # Tests automatizados E2E
│   ├── package.json
│   └── node_modules/
├── package.json           # Scripts orquestadores
├── .env                   # Variables de entorno
└── README.md
```

## 🚀 Inicio Rápido

### Instalar Dependencias

```bash
# Frontend
npm --prefix frontend install

# Backend
npm --prefix backend install
```

### Ejecutar en Desarrollo

**Opción 1: Ambos servicios juntos (recomendado)**
```powershell
npm run dev:all
```

**Opción 2: Por separado**
```powershell
# Terminal 1: Frontend (Vite)
npm --prefix frontend run dev

# Terminal 2: Backend (Express + Socket.IO)
npm --prefix backend run dev
```

### Acceso a la Aplicación

- **Frontend**: http://localhost:5174/
- **Backend API**: http://localhost:5176/api/*
- **WebSockets**: ws://localhost:5176

## 🧪 Tests Automatizados

Ejecutar prueba E2E (simula dos clientes y valida eventos WebSocket):

```bash
npm --prefix backend run e2e
```

Resultado esperado: ✓ Passed: 19 | ✗ Failed: 0

## 📡 API Endpoints

### Rooms
- `GET /api/rooms` - Obtener todas las salas
- `POST /api/rooms` - Crear nueva sala
- `POST /api/rooms/:id/join` - Unirse a una sala
- `PUT /api/rooms/:id/start` - Iniciar partida
- `POST /api/rooms/:id/event` - Emitir evento de juego

### Autenticación
- `POST /api/login` - Login con email

## 🔌 WebSocket Events

**From Server:**
- `rooms:update` - Actualización de salas disponibles
- `player:joined` - Cuando un jugador se une
- `room:started` - Cuando se inicia la partida
- `game:event` - Eventos del juego en tiempo real

**From Client:**
- `joinRoom` - Cliente se une a una sala

## 📦 Dependencias Principales

### Frontend
- React 18
- TypeScript
- Vite
- TailwindCSS
- Framer Motion
- Socket.IO Client
- Radix UI

### Backend
- Node.js + Express
- Socket.IO
- CORS

## 🎮 Características

- ✓ Salas de juego múltiples
- ✓ Comunicación en tiempo real con WebSockets
- ✓ Sistema de equipos
- ✓ Eventos de juego sincronizados
- ✓ Tests E2E automatizados
- ✓ Frontend y Backend completamente separados

## 📝 Scripts Disponibles

### Raíz
- `npm run dev:all` - Ejecutar frontend + backend juntos
- `npm run server` - Solo backend

### Frontend
- `npm --prefix frontend run dev` - Dev server Vite
- `npm --prefix frontend run build` - Build para producción

### Backend
- `npm --prefix backend run dev` - Dev server con nodemon
- `npm --prefix backend run start` - Producción
- `npm --prefix backend run e2e` - Tests automatizados

## 🛠️ Próximas Mejoras

- [ ] Persistencia de datos (BD)
- [ ] Autenticación JWT
- [ ] Más juegos y modos
- [ ] Estadísticas de jugadores
- [ ] Rooms con contraseña

---

Desarrollado con ❤️
