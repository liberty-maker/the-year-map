export type ArcanaNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22;

export type ArcanaMeaning = {
  number: ArcanaNumber;
  title: string;
  keywords: string[];
  light: string;
  shadow: string;
};

export const ARCANA_DICTIONARY: Record<ArcanaNumber, ArcanaMeaning> = {
  1: { number: 1, title: 'Magician', keywords: ['initiative', 'skill', 'focus'], light: 'Start deliberately and use available tools well.', shadow: 'Avoid forcing outcomes before the plan is clear.' },
  2: { number: 2, title: 'High Priestess', keywords: ['intuition', 'listening', 'patience'], light: 'Trust quiet signals and gather context.', shadow: 'Avoid withdrawing so far that decisions stall.' },
  3: { number: 3, title: 'Empress', keywords: ['growth', 'care', 'creation'], light: 'Nurture what is ready to become visible.', shadow: 'Avoid overextending care without boundaries.' },
  4: { number: 4, title: 'Emperor', keywords: ['structure', 'authority', 'stability'], light: 'Create order, ownership, and reliable routines.', shadow: 'Avoid rigidity when adaptation is needed.' },
  5: { number: 5, title: 'Hierophant', keywords: ['learning', 'tradition', 'values'], light: 'Anchor choices in principles and trusted teaching.', shadow: 'Avoid outsourcing your judgment to convention.' },
  6: { number: 6, title: 'Lovers', keywords: ['choice', 'alignment', 'relationship'], light: 'Choose what strengthens coherence and connection.', shadow: 'Avoid indecision caused by trying to please everyone.' },
  7: { number: 7, title: 'Chariot', keywords: ['drive', 'direction', 'discipline'], light: 'Move with commitment and measured momentum.', shadow: 'Avoid confusing speed with sustainable progress.' },
  8: { number: 8, title: 'Justice', keywords: ['balance', 'truth', 'accountability'], light: 'Make fair decisions with clear evidence.', shadow: 'Avoid harsh self-judgment or scorekeeping.' },
  9: { number: 9, title: 'Hermit', keywords: ['reflection', 'wisdom', 'completion'], light: 'Step back to see the pattern and simplify.', shadow: 'Avoid isolation when support would help.' },
  10: { number: 10, title: 'Wheel of Fortune', keywords: ['cycles', 'change', 'timing'], light: 'Work with changing conditions and pivot gracefully.', shadow: 'Avoid passivity when the cycle asks for action.' },
  11: { number: 11, title: 'Strength', keywords: ['courage', 'vitality', 'self-trust'], light: 'Lead with calm confidence and steady energy.', shadow: 'Avoid proving strength through overexertion.' },
  12: { number: 12, title: 'Hanged One', keywords: ['pause', 'perspective', 'release'], light: 'Reframe the situation before pushing ahead.', shadow: 'Avoid staying suspended after insight arrives.' },
  13: { number: 13, title: 'Death', keywords: ['ending', 'renewal', 'transition'], light: 'Let completed forms make room for renewal.', shadow: 'Avoid clinging to what has already served its purpose.' },
  14: { number: 14, title: 'Temperance', keywords: ['integration', 'healing', 'moderation'], light: 'Blend resources slowly and restore balance.', shadow: 'Avoid diluting priorities until nothing moves.' },
  15: { number: 15, title: 'Devil', keywords: ['attachment', 'desire', 'materiality'], light: 'Name constraints honestly and reclaim agency.', shadow: 'Avoid repeating patterns because they feel familiar.' },
  16: { number: 16, title: 'Tower', keywords: ['disruption', 'truth', 'reset'], light: 'Use revelations to rebuild on stronger ground.', shadow: 'Avoid ignoring cracks until change becomes abrupt.' },
  17: { number: 17, title: 'Star', keywords: ['hope', 'guidance', 'renewal'], light: 'Follow a clear vision and restore faith.', shadow: 'Avoid idealizing the future without practical steps.' },
  18: { number: 18, title: 'Moon', keywords: ['dreams', 'uncertainty', 'subconscious'], light: 'Move gently through ambiguity and track signals.', shadow: 'Avoid making fear the narrator of the facts.' },
  19: { number: 19, title: 'Sun', keywords: ['clarity', 'joy', 'visibility'], light: 'Let success, warmth, and transparency lead.', shadow: 'Avoid overlooking details because things feel bright.' },
  20: { number: 20, title: 'Judgement', keywords: ['calling', 'review', 'awakening'], light: 'Answer the larger call after honest review.', shadow: 'Avoid relitigating the past instead of integrating it.' },
  21: { number: 21, title: 'World', keywords: ['completion', 'mastery', 'integration'], light: 'Celebrate completion and bring the system together.', shadow: 'Avoid delaying closure through endless polishing.' },
  22: { number: 22, title: 'Fool', keywords: ['beginning', 'trust', 'openness'], light: 'Begin with curiosity and a clean field of possibility.', shadow: 'Avoid leaping without basic orientation.' },
};

export function getArcanaMeaning(value: number): ArcanaMeaning {
  const energy = normalizeArcanaNumber(value);
  return ARCANA_DICTIONARY[energy];
}

export function normalizeArcanaNumber(value: number): ArcanaNumber {
  if (!Number.isInteger(value) || value < 1) {
    throw new Error('Arcana value must be a positive integer.');
  }

  let result = value;
  while (result > 22) {
    result = String(result).split('').reduce((sum, digit) => sum + Number(digit), 0);
  }

  return result as ArcanaNumber;
}
