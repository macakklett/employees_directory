import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, FilterPosition, SortingEmployees, StatusOfProcessing } from '@/types/employee';

interface EmployeesState {
  employees: Employee[];
  filterPosition: FilterPosition;
  filterText: string;
  sorting: SortingEmployees;
  status: StatusOfProcessing;
  error: string | null;
}

const initialState: EmployeesState = {
  employees: [],
  filterPosition: 'all',
  filterText: '',
  sorting: 'alphabet',
  status: 'completed',
  error: null,
};

interface FetchEmployeesError {
  message: string;
}

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

export const fetchEmployeeById = createAsyncThunk<
  Employee,
  string,
  { rejectValue: FetchEmployeesError }
>('employees/fetchEmployeeById', async function (id, { rejectWithValue }) {
  try {
    const response = await fetch(`https://66a0f8b17053166bcabd894e.mockapi.io/api/workers/${id}`);

    if (!response.ok) {
      throw new Error('Server Error!');
    }

    const data: Employee = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue({ message: (error as Error).message });
  }
});

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setFilterPosition: (state, action: PayloadAction<FilterPosition>) => {
      state.filterPosition = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filterText = action.payload;
    },
    setSorting: (state, action: PayloadAction<SortingEmployees>) => {
      state.sorting = action.payload;
    },
  },
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
      })
      .addCase(fetchEmployeeById.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, action: PayloadAction<Employee>) => {
        state.status = 'completed';
        const existingEmployee = state.employees.find(emp => emp.id === action.payload.id);
        if (existingEmployee) {
          Object.assign(existingEmployee, action.payload);
        } else {
          state.employees.push(action.payload);
        }
      })
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload ? action.payload.message : 'Unknown error';
      });
  },
});

export const { setFilterPosition, setFilter, setSorting } = employeesSlice.actions;

export default employeesSlice.reducer;
