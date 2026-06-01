export type ArcanaMeaning = {
  arcana: number;
  title: string;
  core: string;
  light: string;
  shadow: string;
  question: string;
  action: string;
};

export const ARCANA_DICTIONARY: Record<number, ArcanaMeaning> = {
  1: {
    arcana: 1,
    title: 'Magician',
    core: 'You are invited to shape intention into practical action.',
    light: 'Focus turns available resources into visible progress.',
    shadow: 'Scattered effort can make simple steps feel complicated.',
    question: 'What is the clearest next action I can take?',
    action: 'Choose one priority and begin with a concrete step.',
  },
  2: {
    arcana: 2,
    title: 'Unity',
    core: 'Connection, trust, and inner agreement are asking for attention.',
    light: 'Listening creates space for mutual understanding.',
    shadow: 'Avoiding your own needs may blur healthy boundaries.',
    question: 'Where do I need more honesty in relationship with myself or others?',
    action: 'Name one boundary or agreement with calm clarity.',
  },
  3: {
    arcana: 3,
    title: 'Empress',
    core: 'Growth becomes easier when care and creativity are protected.',
    light: 'Nurturing what matters can bring natural momentum.',
    shadow: 'Overgiving may drain the energy needed for creation.',
    question: 'What needs steady care rather than pressure?',
    action: 'Give time to one creative or nourishing practice.',
  },
  4: {
    arcana: 4,
    title: 'Emperor',
    core: 'Structure supports freedom when it is built with purpose.',
    light: 'Clear standards help you lead with steadiness.',
    shadow: 'Control can harden when flexibility is needed.',
    question: 'What structure would make my life feel safer and simpler?',
    action: 'Create one rule, plan, or boundary that reduces friction.',
  },
  5: {
    arcana: 5,
    title: 'Teacher',
    core: 'Wisdom grows through practice, reflection, and shared learning.',
    light: 'Guidance can become useful when tested in real life.',
    shadow: 'Rigid beliefs may limit a more honest understanding.',
    question: 'What am I ready to learn or teach with humility?',
    action: 'Study one trusted source and apply one idea today.',
  },
  6: {
    arcana: 6,
    title: 'Choice',
    core: 'Alignment comes from choosing what reflects your values.',
    light: 'A sincere choice can bring emotional clarity.',
    shadow: 'Indecision may keep you attached to competing stories.',
    question: 'Which option feels most aligned with who I am becoming?',
    action: 'Write the value behind your next decision.',
  },
  7: {
    arcana: 7,
    title: 'Chariot',
    core: 'Direction strengthens when discipline and desire move together.',
    light: 'Focused effort can carry you through resistance.',
    shadow: 'Pushing too hard may disconnect you from your body.',
    question: 'Where do I need direction instead of force?',
    action: 'Set a clear destination and one sustainable pace.',
  },
  8: {
    arcana: 8,
    title: 'Justice',
    core: 'Balance asks for honesty, accountability, and fair exchange.',
    light: 'Clear evaluation supports mature decisions.',
    shadow: 'Harsh judgment can hide the deeper lesson.',
    question: 'What truth can I acknowledge without blaming myself?',
    action: 'Correct one imbalance with a fair and measured choice.',
  },
  9: {
    arcana: 9,
    title: 'Hermit',
    core: 'Quiet reflection helps separate inner truth from outside noise.',
    light: 'Solitude can restore perspective and self-trust.',
    shadow: 'Withdrawal may become avoidance when support is needed.',
    question: 'What do I know when I stop seeking approval?',
    action: 'Take a short pause before responding or deciding.',
  },
  10: {
    arcana: 10,
    title: 'Wheel',
    core: 'Change is moving, and adaptation matters more than control.',
    light: 'A flexible mindset helps you use shifting conditions well.',
    shadow: 'Waiting for certainty can delay useful movement.',
    question: 'What change can I cooperate with instead of resisting?',
    action: 'Adjust one plan to match the reality in front of you.',
  },
  11: {
    arcana: 11,
    title: 'Strength',
    core: 'Real strength is patient, grounded, and self-aware.',
    light: 'Gentle persistence can transform tension into confidence.',
    shadow: 'Suppressed emotion may return as pressure or fatigue.',
    question: 'Where can I be firm without becoming hard?',
    action: 'Meet one strong emotion with breath and patience.',
  },
  12: {
    arcana: 12,
    title: 'Perspective',
    core: 'A new angle can reveal choices that effort alone cannot.',
    light: 'Pausing can turn frustration into insight.',
    shadow: 'Staying suspended too long may become passivity.',
    question: 'What might change if I looked from another side?',
    action: 'Delay one reaction and ask a better question.',
  },
  13: {
    arcana: 13,
    title: 'Transformation',
    core: 'Growth may require releasing what no longer fits.',
    light: 'Letting go creates room for a more honest chapter.',
    shadow: 'Clinging to the familiar can make change feel heavier.',
    question: 'What am I ready to complete with respect?',
    action: 'Remove one outdated commitment, object, or habit.',
  },
  14: {
    arcana: 14,
    title: 'Balance',
    core: 'Integration happens through patience, proportion, and steady care.',
    light: 'Small adjustments can restore a sense of harmony.',
    shadow: 'Extremes may signal a need for gentler pacing.',
    question: 'What needs moderation so I can feel more whole?',
    action: 'Choose one calming rhythm and repeat it consistently.',
  },
  15: {
    arcana: 15,
    title: 'Desire',
    core: 'Desire reveals energy that wants conscious direction.',
    light: 'Honest wanting can clarify motivation and vitality.',
    shadow: 'Compulsion may appear when a need goes unnamed.',
    question: 'What do I want, and what need sits beneath it?',
    action: 'Name one desire without judging it or obeying it blindly.',
  },
  16: {
    arcana: 16,
    title: 'Tower',
    core: 'Disruption can expose what was unstable or outdated.',
    light: 'Truth clears space for stronger foundations.',
    shadow: 'Resisting reality may intensify unnecessary stress.',
    question: 'What is asking to be rebuilt more honestly?',
    action: 'Stabilize one practical area before making big moves.',
  },
  17: {
    arcana: 17,
    title: 'Star',
    core: 'Hope becomes useful when paired with gentle consistency.',
    light: 'A clear vision can renew trust in the path ahead.',
    shadow: 'Idealizing the future may distract from present care.',
    question: 'What hope still feels quietly true?',
    action: 'Do one small thing that supports your long-term vision.',
  },
  18: {
    arcana: 18,
    title: 'Moon',
    core: 'Uncertainty invites patience, intuition, and emotional honesty.',
    light: 'Sensitivity can reveal what logic has missed.',
    shadow: 'Fear may fill gaps when facts are incomplete.',
    question: 'What am I feeling, and what do I actually know?',
    action: 'Separate facts from assumptions in writing.',
  },
  19: {
    arcana: 19,
    title: 'Sun',
    core: 'Clarity, warmth, and vitality are ready to be expressed.',
    light: 'Confidence grows when you allow yourself to be visible.',
    shadow: 'Needing constant positivity can hide real feelings.',
    question: 'Where can I let simple joy be enough?',
    action: 'Share appreciation, creativity, or honest enthusiasm.',
  },
  20: {
    arcana: 20,
    title: 'Awakening',
    core: 'A deeper call asks you to respond with maturity.',
    light: 'Reflection can turn experience into meaningful direction.',
    shadow: 'Self-criticism may block the lesson trying to emerge.',
    question: 'What am I being asked to understand now?',
    action: 'Review one pattern and choose a wiser response.',
  },
  21: {
    arcana: 21,
    title: 'World',
    core: 'Completion brings perspective, integration, and readiness.',
    light: 'Recognizing progress helps you carry wisdom forward.',
    shadow: 'Perfectionism may delay celebrating what is complete.',
    question: 'What cycle can I honor as complete?',
    action: 'Close one loop and acknowledge what it taught you.',
  },
  22: {
    arcana: 22,
    title: 'Freedom',
    core: 'Openness invites exploration without abandoning awareness.',
    light: 'A fresh start can restore curiosity and courage.',
    shadow: 'Avoiding commitment may scatter your energy.',
    question: 'Where do I need more spaciousness and more responsibility?',
    action: 'Take one light but intentional step into something new.',
  },
};

export function getArcanaMeaning(arcana: number): ArcanaMeaning {
  validateArcana(arcana);

  return ARCANA_DICTIONARY[arcana];
}

export function getArcanaMeanings(arcanaList: number[]): ArcanaMeaning[] {
  const seen = new Set<number>();
  const meanings: ArcanaMeaning[] = [];

  for (const arcana of arcanaList) {
    if (!seen.has(arcana)) {
      meanings.push(getArcanaMeaning(arcana));
      seen.add(arcana);
    }
  }

  return meanings;
}

function validateArcana(arcana: number): void {
  if (!Number.isInteger(arcana) || arcana < 1 || arcana > 22) {
    throw new Error('Arcana must be an integer from 1 to 22.');
  }
}
