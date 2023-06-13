import { DutyKey } from './duty';

export type User = {
  id: number;
  name: string;
  duties: DutyKey[];
  helpDuties: DutyKey[];
};
