import {
  startOfWeek,
  endOfWeek,
  differenceInCalendarWeeks,
  addWeeks,
} from 'date-fns';
import { users } from './data/users';
import { createWeightUser } from './utils/weightUser';
import { createPlan } from './createPlan';
import { Plan } from './type/plan';

function initialization() {
  const startPlan = startOfWeek(new Date(2023, 6, 12), { weekStartsOn: 1 });
  const endPlan = endOfWeek(new Date(2024, 1, 1), { weekStartsOn: 1 });

  const weeks = differenceInCalendarWeeks(endPlan, startPlan, {
    weekStartsOn: 1,
  });

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
  // eslint-disable-next-line no-console
  console.log('plans', plans);
}

run();
// isFriday; // пятниця
// isSunday; // неділя
