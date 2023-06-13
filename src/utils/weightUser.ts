import { DutyKey } from '@/type/duty';
import { User } from '@/type/user';
import { WeightUser } from '@/type/weightUser';

let weightUsers: WeightUser[] = [];

export function createWeightUser(users: User[]): void {
  weightUsers = users.map(({ id, duties }) => ({
    id,
    duties,
    weight: 0,
    dates: [],
  }));
}

function sortWeightUsers() {
  return weightUsers.sort((a, b) => a.weight - b.weight);
}

type GetWeightUsersParams = {
  dutyKey: DutyKey;
  countUsers: number;
  currentWeek: Date;
};

export function getWeightUsers({
  dutyKey,
  countUsers,
  currentWeek,
}: GetWeightUsersParams) {
  const users = sortWeightUsers().filter(
    (user) =>
      user.duties.includes(dutyKey) && !user.dates.includes(currentWeek),
  );
  return users.slice(0, countUsers);
}

type AddWeightUsersParams = {
  weightUsers: WeightUser[];
  currentWeek: Date;
};

export function addWeightUsers({
  weightUsers,
  currentWeek,
}: AddWeightUsersParams) {
  weightUsers.forEach((weightUser) => {
    const user = weightUsers.find((item) => item.id === weightUser.id);
    if (user) {
      user.weight = user.weight + 1;
      user.dates.push(currentWeek);
    }
  });
}
