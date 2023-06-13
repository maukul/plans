import { DutyKey } from './duty';

export type WeightUser = {
  id: number;
  weight: number;
  dates: Date[];
  duties: DutyKey[];
};
