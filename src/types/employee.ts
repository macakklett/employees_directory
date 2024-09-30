export type Employee = {
  id: string;
  name: string;
  position: string;
  birthDate: number;
  phone: string;
  avatar: string;
  tag: string;
  email: string;
};

export type EmployeesState = {
  employees: Employee[];
  status: StatusOfProcessing;
  error: string | null;
};

export type EmployeesByYear = {
  [year: number]: Employee[];
};

export type RequestParams = {
  positionQuery?: FilterPosition;
  searchText?: string;
  sortBy?: SortingEmployees;
};

export type FilterPosition = 'all' | 'designer' | 'analyst' | 'manager' | 'iOS' | 'android';
export type SortingEmployees = 'name' | 'birthDate';
export type StatusOfProcessing = 'loading' | 'completed' | 'error';
