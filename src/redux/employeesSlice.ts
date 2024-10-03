import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchEmployees from './gateways';
import { Employee, EmployeesState } from '@/types/employee';

const initialState: EmployeesState = {
  employees: [],
  status: 'completed',
  error: null,
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchEmployees.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.status = 'completed';
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload ? action.payload.message : 'Unknown error';
      });
  },
});

export default employeesSlice.reducer;
