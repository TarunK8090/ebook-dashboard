# 📚 Ebook Dashboard (Angular 19 + Angular Material 3)

This project is a responsive e-book dashboard web application built using **Angular 19 (Standalone Mode)** and **Angular Material 3**. Users can sign up, log in, read books line-by-line, and automatically save their reading progress using `localStorage`. The project follows **RxJS-based reactive programming** and simulates API behavior without any real backend.

---

## 🚀 Development Server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to:

```
http://localhost:4200/
```

The app will automatically reload if you change any source files.

---

## ✅ Project Setup

### Prerequisites

- Node.js (LTS version recommended)
- Angular CLI v17+ (supports Angular 19)

### Setup Steps

```bash
git clone https://github.com/TarunK8090/ebook-dashboard.git
cd ebook-dashboard
npm install
ng serve
```

---

## 🧠 Core Features

- ✅ Angular 19 Standalone Architecture (no NgModules)
- ✅ Angular Material 3 UI Components
- ✅ Reactive Programming with RxJS (no Promises)
- ✅ Mock JWT-based login/signup (no actual backend)
- ✅ LocalStorage to track reading progress per book
- ✅ Book reading experience with per-line highlighting
- ✅ Category + book structure (mocked)

---

## 🏗️ Folder Structure

```
src/app/
├── auth/         → login/signup components
├── dashboard/    → book listing page
├── reader/       → e-book reading UI
├── services/     → auth, book, and progress services
├── app.routes.ts → standalone routing
└── app.component.ts
```

---

## ⚙️ Challenges Faced & Solutions

| Challenge | Solution |
|----------|----------|
| **Authentication persistence on refresh** | Used a `BehaviorSubject` in `AuthService` along with a manual check for JWT token on `AppComponent` init to ensure UI updates correctly after reload. |
| **Template flicker with `@if` control flow** | Ensured Angular's `@if` syntax was supported (Angular 17+). Restructured templates and moved login state checks to a shared service. |
| **Handling broken images or missing book covers** | Added error handling for `img` elements using the `(error)` event to load a default placeholder image. |
| **Simulating backend logic like purchases** | Used `localStorage` to mimic backend logic for storing purchased books and user progress. |
| **Ensuring logout UI reflects correctly** | Called `isLoggedIn()` method and subscribed to login state on root `AppComponent` to update navigation dynamically. |

---

## 📌 How I Overcame Them

Most of the issues were tackled by:

- 📖 Reading the Angular 19 documentation for new APIs and control flow syntax.
- 🧪 Debugging DOM rendering behavior using Chrome DevTools.
- ♻️ Using reactive patterns (`BehaviorSubject`) to maintain state across components.
- 🔁 Testing refresh scenarios manually to catch UI inconsistencies.

---

## 🛠 Angular CLI Reference

You can still use Angular CLI commands during development.

### Code Scaffolding

```bash
ng generate component component-name
```

List available schematics:

```bash
ng generate --help
```

### Building the Project

```bash
ng build
```

Build artifacts will be stored in the `dist/` directory.

## 📌 Assignment Compliance Summary

| Requirement                               | Status |
|-------------------------------------------|--------|
| Angular 19 (Standalone mode)              | ✅     |
| Angular Material 3                        | ✅     |
| RxJS (no Promises)                        | ✅     |
| JWT mock-based authentication             | ✅     |
| LocalStorage reading progress tracking    | ✅     |
| README with setup + clear documentation   | ✅     |

---

## 📚 Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Angular Material Components](https://m3.material.io)
- [RxJS Operators](https://rxjs.dev/guide/operators)

---

## 🧾 License

This project was created as part of a technical evaluation assignment and is not intended for production use.
