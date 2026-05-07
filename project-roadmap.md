# QuickTicket — Project Roadmap

## Nombre del Proyecto
QuickTicket

## Objetivo
Sistema simple de gestión de tickets.

---

## Stack

### Frontend
- React
- TypeScript
- Tailwind

### Backend
- Node
- Express
- PostgreSQL

---

## MVP Features

### Auth
- Login
- Register

### Tickets
- Create
- Edit
- Delete
- Filter

### Dashboard
- Stats básicas

---

## Extra Features (después del MVP)
- IA
- Docker
- Tests
- Dark mode

---

## Deadline MVP
**4 semanas**

---

## Detalle de Features MVP

### 1. Autenticación

**Debe incluir:**
- Register
- Login
- Logout

**Opcional:**
- Persistencia de sesión

---

### 2. Dashboard

Pantalla principal.

**Debe mostrar:**
- Tickets abiertos
- Tickets resueltos
- Tickets recientes

---

### 3. Sistema de Tickets

#### Crear Ticket
**Campos:**
- Título
- Descripción
- Prioridad
- Estado

#### Editar Ticket
**Cambiar:**
- Estado
- Prioridad

#### Lista de Tickets
**Con:**
- Filtros
- Búsqueda simple

---

### 4. UI Limpia

No se necesita diseño increíble, pero sí:

- Responsive
- Spacing correcto
- Componentes consistentes
- Loading states
- Empty states

---

### 5. Base de Datos

#### Tablas mínimas

**users**
| Campo    | Tipo |
|----------|------|
| id       | PK   |
| email    | string |
| password | string (hash) |

**tickets**
| Campo       | Tipo |
|-------------|------|
| id          | PK   |
| title       | string |
| description | text |
| status      | enum |
| priority    | enum |
| user_id     | FK → users.id |
