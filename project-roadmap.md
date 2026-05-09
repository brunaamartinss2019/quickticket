# 🎫 QuickTicket — Project Roadmap

## Descripción del Proyecto

**QuickTicket** es una aplicación web de gestión de tickets de soporte diseñada para equipos pequeños y medianos. Permite a los usuarios crear, gestionar y hacer seguimiento de incidencias de forma simple, rápida y organizada.

El objetivo principal es ofrecer una herramienta ligera que no requiera configuración compleja, donde cualquier usuario pueda registrarse, abrir un ticket con su problema y hacer seguimiento del estado hasta su resolución.

### Problema que resuelve

Muchos equipos gestionan sus incidencias por email o chat, lo que genera caos, pérdida de información y falta de visibilidad. QuickTicket centraliza todo en un solo lugar con estados claros, prioridades y un dashboard que muestra el estado real del equipo en tiempo real.

### Usuarios objetivo

- Equipos de soporte técnico
- Pequeñas empresas con necesidad de helpdesk interno
- Desarrolladores que quieren una herramienta simple sin pagar por Jira o Zendesk

---

## Stack Tecnológico

### Frontend
| Tecnología | Versión | Rol |
|------------|---------|-----|
| React | 18+ | UI library |
| TypeScript | 5+ | Tipado estático |
| Tailwind CSS | 3+ | Estilos utilitarios |
| React Router | 6+ | Navegación SPA |
| Axios | latest | HTTP client |

### Backend
| Tecnología | Versión | Rol |
|------------|---------|-----|
| Node.js | 20+ | Runtime |
| Express | 4+ | Framework HTTP |
| PostgreSQL | 15+ | Base de datos |
| JWT | latest | Autenticación |
| bcrypt | latest | Hash de passwords |

---

## Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENTE                          │
│                                                         │
│   ┌──────────┐    ┌──────────┐    ┌──────────────────┐  │
│   │  Login / │    │Dashboard │    │  Tickets (CRUD)  │  │
│   │ Register │    │  Stats   │    │  + Filtros       │  │
│   └────┬─────┘    └────┬─────┘    └────────┬─────────┘  │
│        │               │                   │             │
│        └───────────────┴───────────────────┘             │
│                        │                                 │
│               React + TypeScript                         │
│               Tailwind CSS                               │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP / REST (JSON)
                         │ Authorization: Bearer <JWT>
┌────────────────────────▼────────────────────────────────┐
│                    API REST (Backend)                    │
│                                                         │
│   ┌─────────────┐  ┌──────────────┐  ┌──────────────┐   │
│   │ Auth Routes │  │Ticket Routes │  │  Middleware  │   │
│   │ /api/auth   │  │ /api/tickets │  │  JWT Guard   │   │
│   └──────┬──────┘  └──────┬───────┘  └──────┬───────┘   │
│          │                │                 │            │
│          └────────────────┴─────────────────┘            │
│                           │                              │
│                    Node + Express                        │
└───────────────────────────┬─────────────────────────────┘
                            │ SQL queries
┌───────────────────────────▼─────────────────────────────┐
│                      PostgreSQL                          │
│                                                         │
│        ┌──────────┐          ┌──────────────┐           │
│        │  users   │◄─────────│   tickets    │           │
│        └──────────┘  user_id └──────────────┘           │
└─────────────────────────────────────────────────────────┘
```

---

## Diagrama de Base de Datos

```
┌──────────────────────────┐
│          users           │
├──────────────────────────┤
│ id          SERIAL PK    │
│ email       VARCHAR(255) │◄──┐
│ password    VARCHAR(255) │   │ FK: user_id
│ name        VARCHAR(100) │   │
│ created_at  TIMESTAMP    │   │
└──────────────────────────┘   │
                               │
┌──────────────────────────────┴───┐
│              tickets             │
├──────────────────────────────────┤
│ id           SERIAL PK           │
│ title        VARCHAR(255)        │
│ description  TEXT                │
│ status       ENUM                │
│              ('open',            │
│               'in_progress',     │
│               'resolved',        │
│               'closed')          │
│ priority     ENUM                │
│              ('low',             │
│               'medium',          │
│               'high',            │
│               'critical')        │
│ user_id      INT FK → users.id   │
│ created_at   TIMESTAMP           │
│ updated_at   TIMESTAMP           │
└──────────────────────────────────┘
```

---

## Flujo de Pantallas (User Flow)

```
                    ┌─────────────┐
                    │   Inicio    │
                    └──────┬──────┘
                           │
              ┌────────────▼────────────┐
              │     ¿Tiene cuenta?      │
              └──┬──────────────────┬───┘
                 │ NO               │ SÍ
                 ▼                  ▼
          ┌──────────┐       ┌──────────┐
          │ Register │       │  Login   │
          └────┬─────┘       └────┬─────┘
               │                 │
               └────────┬────────┘
                        │ Auth OK (JWT)
                        ▼
               ┌─────────────────┐
               │    Dashboard    │
               │  ┌───────────┐  │
               │  │ Abiertos  │  │
               │  │ Resueltos │  │
               │  │ Recientes │  │
               │  └───────────┘  │
               └────────┬────────┘
                        │
           ┌────────────┼────────────┐
           │            │            │
           ▼            ▼            ▼
    ┌─────────────┐ ┌────────┐ ┌──────────────┐
    │ Lista de    │ │ Crear  │ │  Ver Ticket  │
    │  Tickets    │ │Ticket  │ │  (detalle)   │
    │ + filtros   │ └────────┘ └──────┬───────┘
    │ + búsqueda  │                   │
    └─────────────┘            ┌──────┴───────┐
                               │              │
                               ▼              ▼
                          ┌─────────┐   ┌──────────┐
                          │ Editar  │   │ Eliminar │
                          │ Ticket  │   │ Ticket   │
                          └─────────┘   └──────────┘
```

---

## MVP Features

### ✅ 1. Autenticación

**Debe incluir:**
- Register — crear cuenta con nombre, email y password
- Login — acceso con email y password, devuelve JWT
- Logout — limpia el token del cliente

**Opcional:**
- Persistencia de sesión con localStorage

**Endpoints:**
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

---

### ✅ 2. Dashboard

Pantalla principal tras el login. Vista rápida del estado actual.

**Debe mostrar:**
- Total de tickets abiertos
- Total de tickets resueltos
- Lista de tickets recientes (últimos 5)
- Indicador visual de prioridad

**Endpoint:**
```
GET /api/dashboard/stats
```

---

### ✅ 3. Sistema de Tickets

#### Crear Ticket
**Campos obligatorios:**
- `title` — título descriptivo del problema
- `description` — detalle del problema
- `priority` — low / medium / high / critical
- `status` — siempre inicia en `open`

#### Editar Ticket
**Campos editables:**
- `status` — cambiar estado del ticket
- `priority` — cambiar nivel de urgencia
- `title` / `description` — correcciones

#### Lista de Tickets
- Filtro por `status`
- Filtro por `priority`
- Búsqueda simple por título

**Endpoints:**
```
GET    /api/tickets          → lista con filtros
GET    /api/tickets/:id      → detalle
POST   /api/tickets          → crear
PUT    /api/tickets/:id      → editar
DELETE /api/tickets/:id      → eliminar
```

---

### ✅ 4. UI Limpia

- Responsive (mobile + desktop)
- Spacing consistente
- Componentes reutilizables
- Loading states en todas las peticiones
- Empty states cuando no hay tickets
- Feedback visual en acciones (crear, editar, borrar)

---

## Timeline — 4 Semanas

| Semana | Foco | Entregables |
|--------|------|-------------|
| **Semana 1** | Setup + Auth | Proyecto configurado, Register, Login, JWT |
| **Semana 2** | Tickets (CRUD) | Crear, editar, eliminar, listar tickets |
| **Semana 3** | Dashboard + Filtros | Stats, filtros, búsqueda, UI pulida |
| **Semana 4** | Testing manual + Deploy | Bug fixes, responsive, deploy básico |

---

## Extra Features (Post-MVP)

| Feature | Descripción |
|---------|-------------|
| 🤖 IA | Sugerencia automática de prioridad según descripción |
| 🐳 Docker | Containerización del backend y base de datos |
| 🧪 Tests | Unit tests en backend, tests de componentes en frontend |
| 🌙 Dark mode | Tema oscuro con Tailwind |

---

## Estructura de Carpetas (Planeada)

```
quickticket/
├── client/                  # Frontend React
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── pages/           # Login, Register, Dashboard, Tickets
│   │   ├── services/        # Llamadas a la API (axios)
│   │   ├── hooks/           # Custom hooks
│   │   └── types/           # TypeScript interfaces
│   └── package.json
│
├── server/                  # Backend Node/Express
│   ├── src/
│   │   ├── routes/          # auth.routes.js, tickets.routes.js
│   │   ├── controllers/     # Lógica de cada endpoint
│   │   ├── middleware/       # JWT guard, error handler
│   │   └── db/              # Conexión y queries PostgreSQL
│   └── package.json
│
├── project-roadmap.md
└── README.md
```
