import { buildAiGuideContext } from './buildAiGuideContext';
import { getArcanaMeanings } from './arcanaDictionary';
import type { ReportData, ReportSection, YearMapProfileValues } from './types';

export type ReportDataInput = {
  userName?: string;
  profile: YearMapProfileValues;
};

export function buildReportData(input: ReportDataInput): ReportData {
  const { profile } = input;
  const aiGuideContext = buildAiGuideContext({
    userName: input.userName,
    profile,
  });
  const overviewArcana = [
    aiGuideContext.focus.core,
    aiGuideContext.focus.year,
    aiGuideContext.focus.month,
    aiGuideContext.focus.today,
  ];

  return {
    title: 'The Year Map Report',
    subtitle: 'Your personal map for self-understanding and yearly navigation.',
    userName: input.userName,
    generatedFor: {
      birthDate: { birthDate: profile.birthDate, gender: profile.gender },
      gender: profile.gender,
      targetYear: profile.targetYear,
      targetMonth: profile.targetMonth,
      targetDate: profile.targetDate,
    },
    disclaimer: aiGuideContext.disclaimer,
    sections: [
      {
        id: 'overview',
        title: 'Overview',
        subtitle: 'Where you are now',
        body: buildOverviewBody(aiGuideContext.focus, overviewArcana),
        arcana: overviewArcana,
      },
      createSection('core-pattern', 'Core Pattern', aiGuideContext.sections.identity),
      createSection('year-map', 'Year Map', aiGuideContext.sections.year),
      createSection('health-map', 'Health Map', aiGuideContext.sections.health),
      createSection('month-energy', 'Month Energy', aiGuideContext.sections.month),
      createSection('day-energy', 'Day Energy', aiGuideContext.sections.day),
      {
        id: 'reflection-questions',
        title: 'Reflection Questions',
        body: aiGuideContext.suggestedQuestions.map((question, index) => `${index + 1}. ${question}`).join('\n'),
        arcana: [],
      },
    ],
  };
}

function createSection(id: string, title: string, source: { summary: string; arcana: number[] }): ReportSection {
  return {
    id,
    title,
    body: source.summary,
    arcana: source.arcana,
  };
}

function buildOverviewBody(
  focus: { core: number; year: number; month: number; today: number },
  arcana: number[],
): string {
  const titles = getArcanaMeanings(arcana).map((meaning) => meaning.title).join(', ');

  return `Your current symbolic markers are core ${focus.core}, year ${focus.year}, month ${focus.month}, and today ${focus.today}. These markers connect with ${titles} themes and are offered as reflective context rather than fixed predictions.`;
}
