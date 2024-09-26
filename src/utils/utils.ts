import { Employee, EmployeesByYear } from '@/types/employee';
import moment from 'moment';

export const sortByYears = (arr: Employee[]): EmployeesByYear => {
  return arr.reduce<EmployeesByYear>((acc, emp) => {
    const year = new Date(emp.birthDate).getFullYear();
    return {
      ...acc,
      [year]: acc[year] ? [...acc[year], emp] : [emp],
    };
  }, {});
};

export const sortStateByAlphabet = (a: Employee, b: Employee): number =>
  a.name.localeCompare(b.name);

export const sortStateByBirthday = (a: Employee, b: Employee): number => {
  const birthDateA = moment(a.birthDate);
  const birthDateB = moment(b.birthDate);

  const monthDiff = birthDateA.month() - birthDateB.month();
  if (monthDiff !== 0) {
    return monthDiff;
  }

  return birthDateA.date() - birthDateB.date();
};
