import { configureStore } from '@reduxjs/toolkit';
import employeesSlice from './features/employees/employeesSlice';

export const store = configureStore({
  reducer: {
    employees: employeesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
