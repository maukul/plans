import { format } from 'date-fns';
import fs from 'fs';
import pdf from 'pdf-creator-node';

import { duties } from './data/duties';
import { users } from './data/users';
import { DutyKey } from './type/duty';
import { Plan } from './type/plan';
import { TemplateData } from './type/template';
import { User } from './type/user';
import { getWeekNumber } from './utils/date';

type createPdfParams = {
  plans: Plan[];
};
const options = {
  format: 'A2',
  orientation: 'landscape', //portrait
  // border: '10mm',
};

function createPdfBase({ plans }: createPdfParams) {
  const html = fs.readFileSync(
    `${__dirname}/template/template-base.html`,
    'utf8',
  );
  const filePath = `${__dirname}/../output/pdf/base.pdf`;

  const dutiesKeyBase: DutyKey[] = [
    'microphones',
    'apparatus',
    'corridors',
    'stage',
    'zoom',
  ];
  const plansBase = plans.filter((plan) => dutiesKeyBase.includes(plan.duty));
  const weeksPlans: TemplateData[] = [];
  plansBase.forEach((planBase) => {
    const plan = weeksPlans.find(
      (item) => item.weekNumber === getWeekNumber(planBase.dateWeek),
    );
    const templateData = {
      duty: {
        name: duties[planBase.duty].name,
        key: planBase.duty,
      },
      users: planBase.usersId
        .map(
          (userId) =>
            users.find((item) => item.id === userId)?.name as User['name'],
        )
        .join(', '),
    };
    if (plan) {
      plan.dates.push(templateData);
    } else {
      weeksPlans.push({
        date: planBase.dates
          .map((item) => format(item, 'yyyy-MM-dd'))
          .join(', '),
        weekNumber: getWeekNumber(planBase.dateWeek),
        dates: [templateData],
      });
    }
  });

  const weeksPlansData = weeksPlans
    .map((item) => ({
      ...item,
      dates: item.dates.sort((a, b) => {
        if (a.duty.key > b.duty.key) {
          return -1;
        }
        if (a.duty.key < b.duty.key) {
          return 1;
        }

        return 0;
      }),
    }))
    .sort((a, b) => a.weekNumber - b.weekNumber);

  const templateDate = {
    html: html,
    data: {
      title: 'Графік',
      weeksPlansHead: weeksPlansData[0].dates,
      weeksPlans: weeksPlansData,
    },
    path: filePath,
    type: '',
  };

  pdf
    .create(templateDate, options)
    .then((res: unknown) => {
      // eslint-disable-next-line no-console
      console.log('res', res);
    })
    .catch((error: unknown) => {
      // eslint-disable-next-line no-console
      console.error('error', error);
    });
}

function createPdfMainEntrance({ plans }: createPdfParams) {
  const html = fs.readFileSync(
    `${__dirname}/template/template-base.html`,
    'utf8',
  );
  const filePath = `${__dirname}/../output/pdf/main-entrance.pdf`;

  const plansMainEntrance = plans.filter(
    (plan) => plan.duty === 'mainEntrance',
  );

  const weeksPlans: TemplateData[] = [];
  plansMainEntrance.forEach((planMainEntrance) => {
    const plan = weeksPlans.find(
      (item) => item.weekNumber === getWeekNumber(planMainEntrance.dateWeek),
    );
    const templateData = {
      duty: {
        name: duties[planMainEntrance.duty].name,
        key: planMainEntrance.duty,
      },
      users: planMainEntrance.usersId
        .map(
          (userId) =>
            users.find((item) => item.id === userId)?.name as User['name'],
        )
        .join(', '),
    };
    if (plan) {
      plan.dates.push(templateData);
    } else {
      weeksPlans.push({
        date: planMainEntrance.dates
          .map((item) => format(item, 'yyyy-MM-dd'))
          .join(', '),
        weekNumber: getWeekNumber(planMainEntrance.dateWeek),
        dates: [templateData],
      });
    }
  });

  const weeksPlansData = weeksPlans
    .map((item) => ({
      ...item,
      dates: item.dates.sort((a, b) => {
        if (a.duty.key > b.duty.key) {
          return -1;
        }
        if (a.duty.key < b.duty.key) {
          return 1;
        }

        return 0;
      }),
    }))
    .sort((a, b) => a.weekNumber - b.weekNumber);

  const templateDate = {
    html: html,
    data: {
      title: 'Графік',
      weeksPlansHead: weeksPlansData[0].dates,
      weeksPlans: weeksPlansData,
    },
    path: filePath,
    type: '',
  };

  pdf
    .create(templateDate, options)
    .then((res: unknown) => {
      // eslint-disable-next-line no-console
      console.log('res', res);
    })
    .catch((error: unknown) => {
      // eslint-disable-next-line no-console
      console.error('error', error);
    });
}
export function createPdf({ plans }: createPdfParams) {
  createPdfBase({ plans });
  createPdfMainEntrance({ plans });
}
