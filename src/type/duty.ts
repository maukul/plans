export type DutyKey =
  | 'microphones'
  | 'apparatus'
  | 'corridors'
  | 'stage'
  | 'mainEntrance'
  | 'zoom';

export type Duty = {
  [key in DutyKey]: {
    name: string;
    countPeople: number;
    customDates?: Date[];
  };
};
