import { DutyKey } from './duty';

export type TemplateData = {
  weekNumber: number;
  date: string;
  dates: {
    users: string;
    duty: {
      key: DutyKey;
      name: string;
    };
  }[];
};
