import { Employee, EmployeesByYear, SortingEmployees } from '@/types/employee';

export const sortByYears = (arr: Employee[]): EmployeesByYear => {
  return arr.reduce<EmployeesByYear>((acc, emp) => {
    const year = new Date(emp.birthDate).getFullYear();
    return {
      ...acc,
      [year]: acc[year] ? [...acc[year], emp] : [emp],
    };
  }, {});
};

export const compareEmployees =
  (sortBy: SortingEmployees) =>
  (a: Employee, b: Employee): number => {
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueA.localeCompare(valueB);
    }

    return 0;
  };
