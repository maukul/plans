import { isSameWeek } from 'date-fns';
import { duties } from './data/duties';
import { DutyKey } from './type/duty';
import { Plan } from './type/plan';
import { addWeightUsers, getWeightUsers } from './utils/weightUser';

type CreatePlanParams = {
  currentWeek: Date;
};

export function createPlan({ currentWeek }: CreatePlanParams) {
  const plans: Plan[] = [];
  const dutiesKey = Object.keys(duties) as DutyKey[];
  dutiesKey.forEach((dutyKey) => {
    const plan: Plan = {
      date: currentWeek,
      duty: dutyKey,
      usersId: [],
    };
    if (duties[dutyKey].customDates === undefined) {
      const users = getWeightUsers({
        countUsers: duties[dutyKey].countPeople,
        currentWeek,
        dutyKey,
      });
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

          plan.date = date;
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
