import { combineReducers, configureStore } from '@reduxjs/toolkit';
import switchItemSlice from './features/switchItem/switchItemSlice';

const rootReducer = combineReducers({
  switchItem: switchItemSlice
})

const store = configureStore({
  reducer: rootReducer,
  devTools: false,
})

export type RootState = ReturnType<typeof rootReducer>;

export default store;
