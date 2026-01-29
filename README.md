# 📱 SL By Mobile

Sistema web para la **gestión de clientes y celulares**, desarrollado con **React + Node.js + MongoDB**, enfocado en buenas prácticas profesionales, arquitectura clara y una experiencia de usuario moderna.

---

## 🎯 1. Descripción del Proyecto

**SL By Mobile** es una aplicación web que permite:

* Gestionar clientes
* Registrar celulares asociados
* Realizar operaciones CRUD completas
* Consultar información de forma rápida y ordenada
* Descargar reportes en PDF
* Guiar al usuario mediante un botón de ayuda interactivo

El proyecto fue desarrollado con un enfoque académico-profesional, cumpliendo criterios de arquitectura, documentación y buenas prácticas.

---

## 🧩 2. Alcance del Proyecto

### ✔ Incluye

* Gestión de clientes (crear, editar, eliminar, listar)
* Gestión de celulares
* Validación de datos
* Botón de ayuda integrado
* API REST
* Persistencia en MongoDB
* Interfaz moderna con Tailwind CSS

### ❌ No incluye

* Pagos en línea
* Notificaciones push
* Multi-idioma

---

## 🧠 3. Arquitectura del Sistema

El sistema sigue una **arquitectura cliente-servidor**:

* **Frontend:** React + Vite + Tailwind CSS
* **Backend:** Node.js + Express
* **Base de datos:** MongoDB (NoSQL)

📐 Patrón arquitectónico: **API REST**

---

## 🗂 4. Modelado de Datos (MongoDB)

### Colección: Clientes

```json
{
  "_id": "ObjectId",
  "nombre": "string",
  "telefono": "string",
  "correo": "string",
  "fechaRegistro": "date"
}
```

### Colección: Celulares

```json
{
  "_id": "ObjectId",
  "marca": "string",
  "modelo": "string",
  "imei": "string",
  "clienteId": "ObjectId"
}
```

🔹 Se utilizan **referencias** para mantener integridad y escalabilidad.

---

## ⚙️ 5. Tecnologías Utilizadas

### Frontend

* React
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express
* MongoDB + Mongoose

### Otros

* Git & GitHub
* PDF Generator

---

## 🔄 6. Funcionalidades Implementadas

* CRUD completo sobre MongoDB
* Validaciones en frontend y backend
* Manejo de errores
* Filtros y búsquedas
* Descarga de reportes en PDF
* Botón de ayuda interactivo

---

## 🔐 7. Seguridad

* Validación de entradas
* Sanitización de datos
* Control de errores
* Variables de entorno

---

## 📈 8. Rendimiento y Optimización

* Uso de índices en MongoDB
* Consultas optimizadas
* Separación clara de responsabilidades

---

## 📘 9. Botón de Ayuda

El sistema incluye un **botón de ayuda flotante**, el cual:

* Explica cómo usar el sistema
* Guía al usuario paso a paso
* Mejora la experiencia de usuario

---

## 📦 10. Instalación y Ejecución

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```
---

## 🧪 11. Metodología de Desarrollo

* Metodología incremental
* Control de versiones con Git
* Commits descriptivos

---

## 🎓 12. Presentación Final

El proyecto está diseñado para ser presentado y defendido académicamente, demostrando:

* Dominio técnico
* Buen diseño de arquitectura
* Uso correcto de MongoDB
* Interfaz moderna y funcional

---

## 👨‍💻 Autor

**Paulo**
Proyecto académico – Gestión de Clientes y Celulares

---

✅ Proyecto desarrollado con enfoque profesional y académico.
