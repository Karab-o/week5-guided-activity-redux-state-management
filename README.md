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

## Changes from the activity instructions

The code follows the instructions below, with a few small changes so it builds and runs with the current versions of Redux 5, TypeScript and Vite:

- **Logger import:** `createLogger()` from `redux-logger` is used instead of the default import, which fails at runtime with "middleware is not a function" under the current Vite build.
- **`createStore` arguments:** `undefined` is passed as the preloaded state so Redux 5's types accept `applyMiddleware(logger)` as the enhancer.
- **Typed actions:** actions have TypeScript interfaces and a `CounterAction` union type instead of `action: any`.
- **Type-only imports:** `RootState` and `AppDispatch` use `import type`, which the project's `verbatimModuleSyntax` setting requires.
- **Unused `React` imports removed:** the new JSX transform doesn't need them, and `noUnusedLocals` rejects them.
- **Typed dispatch:** `useDispatch<AppDispatch>()` is used in `Counter.tsx`.

---

# Activity Instructions: Redux State Management (Without Redux Toolkit)

**Title:** Setting Up Redux with React & TypeScript

**Objective:** Learn how to integrate Redux for state management in a React + Vite + TypeScript project **without Redux Toolkit**. Students will understand **how Redux manages state globally**, **how to write reducers and actions**, and **how to connect Redux with React**.

## Tools

- GitHub Classroom
- GitHub Codespaces (or a local development environment with Node.js and a suitable IDE like VS Code)
- Vite
- React
- TypeScript
- Redux (manual setup)
- React-Redux
- Redux-Logger

## Part 1: Project Setup with Vite and Redux

### Step 1: Create a New React Project with Vite

1. Create the project:
   ```bash
   npm create vite@latest react-redux-app -- --template react-ts
   ```
2. Navigate to the project directory:
   ```bash
   cd react-redux-app
   ```
3. Install dependencies:
   ```bash
   npm install redux react-redux redux-logger @types/redux-logger
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

Ensure the development server is running at `http://localhost:5173/`.

## Section 1: Setting Up Redux

### Step 1: Creating the Redux Store with Logger Middleware

1. Inside `src/`, create a new folder named `store/`.
2. Inside `store/`, create a file named `store.ts`:
   ```typescript
   import { createStore, applyMiddleware } from "redux";
   import { rootReducer } from "./reducers";
   import logger from "redux-logger";

   export const store = createStore(rootReducer, applyMiddleware(logger));

   export type RootState = ReturnType<typeof store.getState>;
   export type AppDispatch = typeof store.dispatch;
   ```

### Step 2: Defining Actions

1. Inside `src/store`, create a new folder named `actions/`.
2. Inside `src/store/actions/`, create a file named `counterActions.ts`:
   ```typescript
   export const INCREMENT = "INCREMENT";
   export const DECREMENT = "DECREMENT";
   export const RESET = "RESET";

   export const increment = () => ({ type: INCREMENT });
   export const decrement = () => ({ type: DECREMENT });
   export const reset = () => ({ type: RESET });
   ```

### Step 3: Creating a Counter Reducer

1. Inside `src/store`, create a new folder named `reducers/`.
2. Inside `src/store/reducers`, create a file named `counterReducer.ts`:
   ```typescript
   import { INCREMENT, DECREMENT, RESET } from "../actions/counterActions";

   interface CounterState {
     value: number;
   }

   const initialState: CounterState = {
     value: 0,
   };

   export const counterReducer = (state = initialState, action: any): CounterState => {
     switch (action.type) {
       case INCREMENT:
         return { value: state.value + 1 };
       case DECREMENT:
         return { value: state.value - 1 };
       case RESET:
         return { value: 0 };
       default:
         return state;
     }
   };
   ```
3. Inside `src/store/reducers/`, create `index.ts` to combine reducers:
   ```typescript
   import { combineReducers } from "redux";
   import { counterReducer } from "./counterReducer";

   export const rootReducer = combineReducers({
     counter: counterReducer,
   });
   ```

### Step 4: Configuring Redux Provider in the Application

Modify `main.tsx` to wrap the app with Redux Provider:

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

## Section 2: Using Redux in a Component (Counter Example)

### Step 1: Creating a Counter Component

1. Inside `src/components/`, create a file named `Counter.tsx`:
   ```typescript
   import React from "react";
   import { useSelector, useDispatch } from "react-redux";
   import { RootState } from "../store/store";
   import { increment, decrement, reset } from "../store/actions/counterActions";
   import styles from "./Counter.module.css";

   const Counter = () => {
     const count = useSelector((state: RootState) => state.counter.value);
     const dispatch = useDispatch();

     return (
       <div className={styles.counterContainer}>
         <h2>Counter: {count}</h2>
         <button onClick={() => dispatch(increment())}>+</button>
         <button onClick={() => dispatch(decrement())}>-</button>
         <button onClick={() => dispatch(reset())}>Reset</button>
       </div>
     );
   };

   export default Counter;
   ```
2. Create a file named `Counter.module.css` in `src/components/` and add styles:
   ```css
   .counterContainer {
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     gap: 10px;
     padding: 20px;
     background-color: #f5f5f5;
     border-radius: 10px;
     width: 250px;
     margin: auto;
   }

   button {
     padding: 10px 15px;
     margin: 5px;
     font-size: 16px;
     border: none;
     border-radius: 5px;
     cursor: pointer;
   }
   ```

### Step 2: Importing Counter Component in `App.tsx`

```typescript
import React from "react";
import Counter from "./components/Counter";

function App() {
  return (
    <div>
      <h1>React + Redux + TypeScript</h1>
      <Counter />
    </div>
  );
}

export default App;
```

## Final Steps: Commit and Push to GitHub

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Implemented Redux State Management Without Redux Toolkit"
   ```
2. Push to GitHub:
   ```bash
   git push origin main
   ```

## Further Challenges (Optional)

1. **Persist State in Local Storage:** modify the store to persist state across page reloads.
2. **Add More Redux Actions:** extend the counter example to allow setting a custom value.
3. **Use Multiple Redux Reducers:** create another reducer for managing user authentication.
