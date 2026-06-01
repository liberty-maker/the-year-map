import { getArcanaMeanings } from './arcanaDictionary';
import type { AiGuideContext, AiGuideContextInput, AiGuideSection } from './types';

const DISCLAIMER = 'This is a symbolic self-reflection guide, not medical, legal, financial, or psychological advice.';

const SUGGESTED_QUESTIONS = [
  'What should I focus on today?',
  'What is the main lesson of my current year?',
  'How can I use my strongest resource better?',
  'What pattern should I observe in relationships?',
  'How should I support my energy this month?',
  'What does my Health Map suggest symbolically?',
];

export function buildAiGuideContext(input: AiGuideContextInput): AiGuideContext {
  const { profile } = input;

  return {
    userName: input.userName,
    disclaimer: DISCLAIMER,
    focus: {
      today: profile.dayEnergy.D_Day,
      month: profile.monthEnergy.D_Month,
      year: profile.yearMatrix.D_Year,
      core: profile.baseMatrix.D,
    },
    sections: {
      identity: buildSection(
        'Your Core Pattern',
        [profile.baseMatrix.A, profile.baseMatrix.B, profile.baseMatrix.V, profile.baseMatrix.G, profile.baseMatrix.D],
        'Your core map combines',
        'suggesting a steady pattern for self-reflection rather than a fixed identity.',
      ),
      year: buildSection(
        'Your Year Map',
        [
          profile.yearMatrix.A_Year,
          profile.yearMatrix.B_Year,
          profile.yearMatrix.V_Year,
          profile.yearMatrix.G_Year,
          profile.yearMatrix.D_Year,
        ],
        'Your year map brings forward',
        'as themes to observe across decisions, timing, and personal growth.',
      ),
      health: buildHealthSection(profile.healthMap.rows.map((row) => row.emotional), profile.healthMap.overallBalance),
      month: buildSection(
        'Your Month Energy',
        [
          profile.monthEnergy.A_Month,
          profile.monthEnergy.B_Month,
          profile.monthEnergy.G_Month,
          profile.monthEnergy.D_Month,
        ],
        'Your month energy highlights',
        'as a practical lens for pacing, priorities, and reflection.',
      ),
      day: buildSection(
        'Your Day Energy',
        [profile.dayEnergy.A_Day, profile.dayEnergy.B_Day, profile.dayEnergy.G_Day, profile.dayEnergy.D_Day],
        'Your day energy centers on',
        'as a calm prompt for attention and choice today.',
      ),
    },
    suggestedQuestions: SUGGESTED_QUESTIONS,
  };
}

function buildSection(title: string, arcana: number[], prefix: string, suffix: string): AiGuideSection {
  const titles = getArcanaMeanings(arcana).map((meaning) => meaning.title);

  return {
    title,
    arcana,
    summary: `${prefix} ${formatTitles(titles)} themes, ${suffix}`,
  };
}

function buildHealthSection(arcana: number[], overallBalance: number): AiGuideSection {
  const titles = getArcanaMeanings(arcana).map((meaning) => meaning.title);

  return {
    title: 'Your Symbolic Health Map',
    arcana,
    summary: `Your symbolic Health Map has an overall balance score of ${overallBalance}, with ${formatTitles(titles)} emotional themes to observe gently.`,
  };
}

function formatTitles(titles: string[]): string {
  if (titles.length === 0) {
    return 'no repeated';
  }

  if (titles.length === 1) {
    return titles[0];
  }

  if (titles.length === 2) {
    return `${titles[0]} and ${titles[1]}`;
  }

  return `${titles.slice(0, -1).join(', ')} and ${titles[titles.length - 1]}`;
}
