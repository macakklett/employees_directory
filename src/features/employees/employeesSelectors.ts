import { createSelector } from 'reselect';
import { RootState } from '../../store';
import { sortStateByAlphabet, sortStateByBirthday } from '@/utils/utils';

export const selectAllEmployees = (state: RootState) => state.employees.employees;

export const selectEmployeeById = (state: RootState, employeeId: string) =>
  state.employees.employees.find(employee => employee.id === employeeId);

export const selectSorting = (state: RootState) => state.employees.sorting;
export const selectFilterPosition = (state: RootState) => state.employees.filterPosition;
export const selectFilterText = (state: RootState) => state.employees.filterText;
export const selectStatus = (state: RootState) => state.employees.status;
export const selectError = (state: RootState) => state.employees.error;

export const selectFilteredEmployees = createSelector(
  [selectAllEmployees, selectSorting, selectFilterPosition, selectFilterText],
  (employees, sortingType, filterPosition, filterText) => {
    const sortedEmployees = [...employees].sort(
      sortingType === 'alphabet' ? sortStateByAlphabet : sortStateByBirthday,
    );

    const filteredEmployeesByPosition =
      filterPosition === 'all'
        ? sortedEmployees
        : sortedEmployees.filter(employee => employee.position === filterPosition);

    return filteredEmployeesByPosition.filter(
      ({ name, tag, email }) =>
        name.includes(filterText) || tag.includes(filterText) || email.includes(filterText),
    );
  },
);
