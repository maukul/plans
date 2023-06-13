import { DutyKey } from './duty';
import { User } from './user';

export type Plan = {
  usersId: User['id'][];
  duty: DutyKey;
  date: Date;
};
