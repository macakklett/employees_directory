import { Employee } from '@/types/employee';
import { RootState } from './store';

export const selectAllEmployees = (state: RootState) => state.employees.employees;
export const selectEmployeeById = (state: RootState, id: string): Employee | undefined => {
  return state.employees.employees.find(employee => employee.id === id);
};

export const selectStatus = (state: RootState) => state.employees.status;
export const selectError = (state: RootState) => state.employees.error;
