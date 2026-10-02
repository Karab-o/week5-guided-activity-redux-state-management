import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { rootReducer } from "./reducers";

// redux-logger middleware logs every dispatched action with the state before and after it
const logger = createLogger();

export const store = createStore(rootReducer, undefined, applyMiddleware(logger));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
