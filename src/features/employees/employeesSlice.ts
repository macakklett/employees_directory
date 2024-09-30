import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, StatusOfProcessing } from '@/types/employee';

type EmployeesState = {
  employees: Employee[];
  status: StatusOfProcessing;
  error: string | null;
};

type FetchEmployeesError = {
  message: string;
};

const initialState: EmployeesState = {
  employees: [],
  status: 'completed',
  error: null,
};

export const fetchEmployees = createAsyncThunk<
  Employee[],
  void,
  { rejectValue: FetchEmployeesError }
>('employees/fetchEmployees', async function (_, { rejectWithValue }) {
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
});

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
