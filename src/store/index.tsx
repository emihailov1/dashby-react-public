import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { reducer as formReducer } from 'redux-form';

import { uiReducer } from "./ui/reducers";
import { authReducer } from "./auth/reducers";

const rootReducer = combineReducers({
  form: formReducer,
  sidebar: uiReducer,
  auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export function configureStore() {
  const middlewares = [thunkMiddleware];
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
}

const store = configureStore();

export default store;
