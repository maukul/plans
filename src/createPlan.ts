import { isSameWeek } from 'date-fns';

import { duties } from './data/duties';
import { DutyKey } from './type/duty';
import { Plan } from './type/plan';
import { getFridaySundayWeek } from './utils/date';
import { addWeightUsers, getWeightUsers } from './utils/weightUser';

type CreatePlanParams = {
  currentWeek: Date;
};

export function createPlan({ currentWeek }: CreatePlanParams) {
  const plans: Plan[] = [];
  const dutiesKey = Object.keys(duties) as DutyKey[];
  dutiesKey.forEach((dutyKey) => {
    const plan: Plan = {
      dates: [],
      dateWeek: currentWeek,
      duty: dutyKey,
      usersId: [],
    };

    if (
      ['microphones', 'apparatus', 'corridors', 'stage', 'zoom'].includes(
        dutyKey,
      )
    ) {
      const users = getWeightUsers({
        countUsers: duties[dutyKey].countPeople,
        currentWeek,
        dutyKey,
      });
      plan.dates = getFridaySundayWeek(currentWeek);
      plan.usersId.push(...users.map((user) => user.id));
      addWeightUsers({
        weightUsers: users,
        currentWeek,
      });
    } else {
      duties[dutyKey].customDates
        ?.filter((item) => isSameWeek(item, currentWeek))
        .forEach((date) => {
          const users = getWeightUsers({
            countUsers: duties[dutyKey].countPeople,
            currentWeek,
            dutyKey,
          });
          plan.dates.push(date);
          plan.usersId.push(...users.map((user) => user.id));
          addWeightUsers({
            weightUsers: users,
            currentWeek,
          });
        });
    }
    plans.push(plan);
  });
  return plans;
}
