import {
  addWeeks,
  differenceInCalendarWeeks,
  endOfWeek,
  setDefaultOptions,
  startOfWeek,
} from 'date-fns';

import { createPdf } from './createPdf';
import { createPlan } from './createPlan';
import { users } from './data/users';
import { Plan } from './type/plan';
import { createWeightUser } from './utils/weightUser';

function initialization() {
  setDefaultOptions({ weekStartsOn: 1 });
  const startPlan = startOfWeek(new Date(2023, 6, 12));
  const endPlan = endOfWeek(new Date(2024, 1, 1));

  const weeks = differenceInCalendarWeeks(endPlan, startPlan);

  createWeightUser(users);

  return {
    startPlan,
    endPlan,
    weeks,
  };
}

function run() {
  const { startPlan, weeks } = initialization();
  const plans: Plan[] = [];
  for (let index = 0; index <= weeks; index++) {
    const currentWeek = addWeeks(startPlan, index);
    const plansWeek = createPlan({
      currentWeek,
    });
    plans.push(...plansWeek);
  }

  createPdf({
    plans,
  });
}

run();
