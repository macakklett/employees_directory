import { Employee } from '@/types/employee';
import moment from 'moment';

export const sortStateByAlphabet = (a: Employee, b: Employee): number =>
  a.name.localeCompare(b.name);

export const sortStateByBirthday = (a: Employee, b: Employee): number => {
  const today = moment();
  const currentYear = today.year();

  const birthDateA = moment(a.birthDate);
  const nextBirthdayA = birthDateA.set('year', currentYear);

  const birthDateB = moment(b.birthDate);
  const nextBirthdayB = birthDateB.set('year', currentYear);

  if (nextBirthdayA.isBefore(today)) {
    nextBirthdayA.add(1, 'years');
  }

  if (nextBirthdayB.isBefore(today)) {
    nextBirthdayB.add(1, 'years');
  }

  const diffA = nextBirthdayA.diff(today, 'days');
  const diffB = nextBirthdayB.diff(today, 'days');

  return diffA - diffB;
};
