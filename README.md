# Week 5 Guided Activity: Redux State Management

A React + Vite + TypeScript counter app that manages global state with Redux, set up by hand without Redux Toolkit.

## What it covers

- Redux store created with `createStore` and `redux-logger` middleware (`src/store/store.ts`)
- Typed action types and action creators (`src/store/actions/counterActions.ts`)
- Counter reducer (`src/store/reducers/counterReducer.ts`)
- Reducers combined with `combineReducers` (`src/store/reducers/index.ts`)
- App wrapped in the Redux `Provider` (`src/main.tsx`)
- `Counter` component that reads state with `useSelector` and updates it with `useDispatch` (`src/components/Counter.tsx`)

## Project structure

```
src/
├── components/
│   ├── Counter.tsx
│   └── Counter.module.css
├── store/
│   ├── actions/
│   │   └── counterActions.ts
│   ├── reducers/
│   │   ├── counterReducer.ts
│   │   └── index.ts
│   └── store.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173/. Use the **+**, **-** and **Reset** buttons. Each dispatched action and the state before and after it are logged in the browser console by `redux-logger`.

## Scripts

- `npm run dev`: start the development server
- `npm run build`: type-check and build for production
- `npm run preview`: preview the production build
