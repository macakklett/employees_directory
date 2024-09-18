export interface Employee {
  id: string;
  name: string;
  position: string;
  birthDate: number;
  phone: string;
  avatar: string;
  tag: string;
  email: string;
}

export type FilterPosition = 'all' | 'designer' | 'analyst' | 'manager' | 'iOS' | 'android';
export type SortingEmployees = 'alphabet' | 'birthday';
export type StatusOfProcessing = 'loading' | 'completed' | 'error';
