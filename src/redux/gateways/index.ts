import { Employee } from '@/types/employee';
import { createAsyncThunk } from '@reduxjs/toolkit';

type FetchEmployeesError = {
  message: string;
};

const fetchEmployees = createAsyncThunk<Employee[], void, { rejectValue: FetchEmployeesError }>(
  'employees/fetchEmployees',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('https://66a0f8b17053166bcabd894e.mockapi.io/api/workers');

      if (!response.ok) {
        throw new Error('Server Error!');
      }

      const data: Employee[] = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ message: (error as Error).message });
    }
  },
);

export default fetchEmployees;
