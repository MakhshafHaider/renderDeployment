import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import postReducer from "./redux/reducers/postReducer";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import commentReducer from "./redux/reducers/commentReducer";
import userReducer from "./redux/reducers/UserReducer";

const rootReducers = combineReducers({
  postReducer,
  commentReducer,
  userReducer
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducers);


const initialState = {};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistedReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);
const persistor = persistStore(store);

export { store, persistor };
