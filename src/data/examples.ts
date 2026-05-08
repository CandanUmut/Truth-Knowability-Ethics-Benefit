/**
 * Pre-built example deliberations matching the three worked cases in
 * §7.5 of the working paper (workplace honesty, organ donation, ribā
 * mortgage). Each is a full Deliberation object that can be rendered
 * read-only or copied into the active session for the user to explore.
 *
 * The constructions are illustrative — close to the paper's narrative
 * but inevitably interpreted by the constructor. The Examples page makes
 * this attribution clear.
 */
import type {
  Deliberation,
  DeliberationOption,
  MaqsidImpact,
  TahaImpact,
} from '@/types/deliberation';

export interface WorkedExample {
  id: 'workplace-honesty' | 'organ-donation' | 'riba-mortgage';
  /** i18n keys under examples.<id>.{title,summary,intro,paperRef} */
  i18nKey: string;
  deliberation: Deliberation;
}

function harm(
  cid: string,
  maqsad: 'din' | 'nafs' | 'aql' | 'nasl' | 'mal',
  tier: 'daruri' | 'haji' | 'tahsini',
  magnitude: 1 | 2 | 3 | 4 | 5,
  conf: 'yaqin' | 'zann_strong' | 'zann' | 'shakk' | 'jahl',
  affected: ('self' | 'family' | 'community' | 'society')[] = ['self']
): MaqsidImpact {
  return {
    id: `imp-${cid}-${Math.random().toString(36).slice(2, 8)}`,
    maqsad,
    direction: 'negative',
    tier,
    magnitude,
    causalConfidence: conf,
    affected,
    notes: `cid:${cid}`,
  };
}

function help(
  cid: string,
  maqsad: 'din' | 'nafs' | 'aql' | 'nasl' | 'mal',
  tier: 'daruri' | 'haji' | 'tahsini',
  magnitude: 1 | 2 | 3 | 4 | 5,
  conf: 'yaqin' | 'zann_strong' | 'zann' | 'shakk' | 'jahl',
  affected: ('self' | 'family' | 'community' | 'society')[] = ['self']
): MaqsidImpact {
  return {
    id: `imp-${cid}-${Math.random().toString(36).slice(2, 8)}`,
    maqsad,
    direction: 'positive',
    tier,
    magnitude,
    causalConfidence: conf,
    affected,
    notes: `cid:${cid}`,
  };
}

function tahaHarm(
  cid: string,
  axis: 'vital' | 'rational' | 'spiritual',
  tier: 'daruri' | 'haji' | 'tahsini',
  magnitude: 1 | 2 | 3 | 4 | 5,
  conf: 'yaqin' | 'zann_strong' | 'zann' | 'shakk' | 'jahl'
): TahaImpact {
  return {
    id: `cid:${cid}`,
    axis,
    direction: 'negative',
    tier,
    magnitude,
    causalConfidence: conf,
  };
}

function tahaHelp(
  cid: string,
  axis: 'vital' | 'rational' | 'spiritual',
  tier: 'daruri' | 'haji' | 'tahsini',
  magnitude: 1 | 2 | 3 | 4 | 5,
  conf: 'yaqin' | 'zann_strong' | 'zann' | 'shakk' | 'jahl'
): TahaImpact {
  return {
    id: `cid:${cid}`,
    axis,
    direction: 'positive',
    tier,
    magnitude,
    causalConfidence: conf,
  };
}

function mkOption(
  id: string,
  label: string,
  description: string,
  impacts: MaqsidImpact[],
  tahaImpacts: TahaImpact[]
): DeliberationOption {
  return { id, label, description, maqasidImpacts: impacts, tahaImpacts };
}

/* ----------------------- Workplace honesty ----------------------- */

const workplaceHonesty: Deliberation = {
  id: 'example-workplace-honesty',
  createdAt: '2025-01-15T10:00:00Z',
  updatedAt: '2025-01-15T10:00:00Z',
  status: 'final',
  title: 'examples.workplace-honesty.title',
  case: {
    description:
      "I am a software engineer on a work visa. I have discovered that my company is shipping a product with a known safety defect. Internal review concluded that the cost of fixing it exceeds the expected liability and decided not to fix it. The defect is unlikely (1 in 50,000) but could cause significant injury when it does occur. Internal channels have been ineffective. I'm trying to decide what to do.",
    agents: [
      { id: 'a-self', kind: 'self' },
      { id: 'a-employer', kind: 'employer' },
      { id: 'a-society', kind: 'society' },
    ],
    options: [
      mkOption(
        'opt-a',
        'Say nothing and continue working',
        'Keep my job, my visa, and my income. Stay quiet about what I know.',
        [
          // Possible harm to users — low probability but real
          harm('risk_life', 'nafs', 'haji', 3, 'zann', ['society']),
          // Damage to engineer's integrity (Commitment 1: ignoring known truth-conditions)
          harm('damage_integrity', 'din', 'haji', 4, 'zann_strong', ['self']),
          // Material gain preserved
          help('gain_resources', 'mal', 'haji', 3, 'yaqin', ['self', 'family']),
        ],
        [tahaHarm('spiritual_cost', 'spiritual', 'haji', 4, 'zann_strong')]
      ),
      mkOption(
        'opt-b',
        'Report to the regulator',
        'Disclose the defect to the appropriate regulatory body, with documentation.',
        [
          // Strong positive on user safety
          help('protect_life', 'nafs', 'daruri', 4, 'zann_strong', ['society']),
          // Likely loss of job + visa
          harm('money_property', 'mal', 'daruri', 4, 'zann_strong', ['self', 'family']),
          // Preserves integrity
          help('serve_integrity', 'din', 'haji', 4, 'zann_strong', ['self']),
        ],
        [tahaHelp('spiritual_growth', 'spiritual', 'haji', 4, 'zann_strong')]
      ),
      mkOption(
        'opt-e',
        'Keep pushing internally',
        'Continue raising the issue through internal channels — escalate, document, persist.',
        [
          // Some positive on user safety, but only if pushing succeeds (shakk)
          help('protect_life', 'nafs', 'haji', 3, 'shakk', ['society']),
          // Low cost on mal — still employed for now
          // Positive on integrity, but compromised by knowing it may not work
          help('serve_integrity', 'din', 'haji', 2, 'zann', ['self']),
          // Some risk of professional friction
          harm('mind_wellbeing', 'aql', 'tahsini', 2, 'zann', ['self']),
        ],
        [tahaHelp('spiritual_growth', 'spiritual', 'haji', 2, 'zann')]
      ),
    ],
    timeHorizon: 'weeks',
    reversibility: 2,
    stakes: {
      maqasid: { din: 5, nafs: 4, aql: 3, nasl: 2, mal: 4 },
      taha: { vital: 4, rational: 3, spiritual: 5 },
    },
  },
  claims: [
    {
      id: 'c-1',
      text: 'Internal review correctly assessed this defect as low-probability.',
      basis: 'single_source',
      confidence: 'zann',
      sensitivity: true,
    },
    {
      id: 'c-2',
      text: 'Reporting to the regulator will result in the defect being addressed.',
      basis: 'cumulative',
      confidence: 'zann_strong',
      sensitivity: true,
    },
    {
      id: 'c-3',
      text: 'Internal pushing could still produce a fix.',
      basis: 'intuition',
      confidence: 'shakk',
      sensitivity: false,
    },
  ],
  consultations: [
    {
      id: 'co-1',
      sourceId: 'Q.5.2',
      citation: 'Q. 5:2',
      bearsOnCase: 'yes',
      reasoning: 'Help one another in righteousness, not in sin and transgression.',
    },
    {
      id: 'co-2',
      sourceId: 'muslim.49',
      citation: 'Muslim 49',
      bearsOnCase: 'yes',
      reasoning: 'Whoever sees an evil should change it with their hand, tongue, or heart.',
    },
    {
      id: 'co-3',
      sourceId: 'ibn-majah.2341',
      citation: 'Ibn Majah 2341 (lā ḍarara wa-lā ḍirār)',
      bearsOnCase: 'yes',
      reasoning: 'Averting harm takes priority over securing benefits.',
    },
  ],
  niyya: {
    q1: 'I most want to be able to live with myself and to face God knowing I did not stay silent about preventable harm.',
    q2: 'Yes — I would still report even if my visa were guaranteed, though I might choose a different channel.',
    q3: 'I would not want my employer to learn I had reported, but I would be willing to defend the report publicly if necessary.',
    q4: 'I would tell them: I cannot in good conscience help ship something I know endangers people, however unlikely.',
    q5: 'My conscience reports peace at the thought of having spoken honestly, even with the cost.',
    toneVariant: 'religious',
    leaningOptionId: 'opt-b',
  },
};

/* ----------------------- Organ donation ----------------------- */

const organDonation: Deliberation = {
  id: 'example-organ-donation',
  createdAt: '2025-02-04T14:00:00Z',
  updatedAt: '2025-02-04T14:00:00Z',
  status: 'final',
  title: 'examples.organ-donation.title',
  case: {
    description:
      "I am 45, healthy, and have been asked to register as an organ donor in my country. The question concerns posthumous donation. Under my country's law, registering also authorizes donation after a brain-death determination, which not all Muslim scholars accept as legal death.",
    agents: [
      { id: 'a-self', kind: 'self' },
      { id: 'a-family', kind: 'family' },
      { id: 'a-society', kind: 'society' },
    ],
    options: [
      mkOption(
        'opt-register',
        'Register as a donor',
        'Sign up under my country\'s standard organ donor law.',
        [
          help('protect_life', 'nafs', 'daruri', 4, 'zann_strong', ['society']),
          // Possible negative on body's dignity / din depending on interpretive position
          harm('damage_integrity', 'din', 'haji', 2, 'zann', ['self']),
        ],
        [tahaHelp('spiritual_growth', 'spiritual', 'haji', 3, 'zann')]
      ),
      mkOption(
        'opt-conditional',
        'Register conditionally',
        'Register, but document explicit conditions: dignified handling, no commerce, family consent honored, only after circulatory death.',
        [
          help('protect_life', 'nafs', 'daruri', 3, 'zann_strong', ['society']),
          help('serve_integrity', 'din', 'haji', 3, 'zann_strong', ['self']),
        ],
        [tahaHelp('spiritual_growth', 'spiritual', 'haji', 3, 'zann_strong')]
      ),
      mkOption(
        'opt-decline',
        'Do not register',
        'Decline donor registration; my body is not made available after death.',
        [
          // Forgone help on others' nafs — classical jurists do not generally count this as a sin of omission
          harm('lost_opportunity', 'aql', 'tahsini', 2, 'zann', ['society']),
        ],
        []
      ),
    ],
    timeHorizon: 'months',
    reversibility: 4,
    stakes: {
      maqasid: { din: 4, nafs: 4, aql: 2, nasl: 2, mal: 1 },
      taha: { vital: 4, rational: 2, spiritual: 4 },
    },
  },
  claims: [
    {
      id: 'c-1',
      text: 'Brain death is correctly understood as legal death under the relevant scholarly position.',
      basis: 'cumulative',
      confidence: 'zann',
      sensitivity: true,
    },
    {
      id: 'c-2',
      text: 'My donation will actually save lives.',
      basis: 'cumulative',
      confidence: 'zann_strong',
      sensitivity: false,
    },
  ],
  consultations: [
    {
      id: 'co-1',
      sourceId: 'Q.5.32',
      citation: 'Q. 5:32',
      bearsOnCase: 'yes',
      reasoning:
        'Whoever saves a life, it is as if he saved all humanity. The verse is invoked by permissive positions.',
    },
    {
      id: 'co-2',
      sourceId: 'Q.33.72',
      citation: 'Q. 33:72',
      bearsOnCase: 'unsure',
      reasoning:
        'The trust (amāna) extends to the body. Some scholars read this as restraint on donation; others find no conflict.',
      followsMinority: false,
    },
    {
      id: 'co-3',
      sourceId: 'ibn-majah.2341',
      citation: 'Ibn Majah 2341',
      bearsOnCase: 'yes',
      reasoning: 'No harm, no reciprocation of harm — applies on both sides of this question.',
    },
  ],
  niyya: {
    q1: 'I want to act in a way I can defend before God when I imagine the recipient and the conditions of my own death.',
    q2: 'Yes — I would still want to donate if there were no social expectation to.',
    q3: "Nothing I'd hide. I am genuinely uncertain about brain-death and want my conditions honored.",
    q4: 'I would say: I am moved by Q. 5:32, but I want my decision to fit the interpretive position I trust.',
    q5: 'My conscience prefers the conditional option — it lets me serve without overriding my interpretive caution.',
    toneVariant: 'religious',
    leaningOptionId: 'opt-conditional',
  },
};

/* ----------------------- Ribā mortgage ----------------------- */

const ribaMortgage: Deliberation = {
  id: 'example-riba-mortgage',
  createdAt: '2025-03-12T09:00:00Z',
  updatedAt: '2025-03-12T09:00:00Z',
  status: 'final',
  title: 'examples.riba-mortgage.title',
  case: {
    description:
      'I live in a country where Islamic financing is unavailable or significantly more expensive. I am considering a conventional mortgage to purchase a primary residence. Renting is possible but expensive long-term; saving to buy outright would take 15+ years.',
    agents: [
      { id: 'a-self', kind: 'self' },
      { id: 'a-family', kind: 'family' },
    ],
    options: [
      mkOption(
        'opt-conventional',
        'Take a conventional mortgage',
        'Sign a standard interest-bearing mortgage to buy the home now.',
        [
          help('serve_family', 'nasl', 'haji', 4, 'zann_strong', ['family']),
          help('gain_resources', 'mal', 'haji', 3, 'zann_strong', ['self', 'family']),
          // Negative on din — riba is forbidden in clear Qur'anic terms; severity depends on the user's interpretive position
          harm('damage_integrity', 'din', 'haji', 4, 'zann_strong', ['self']),
        ],
        [tahaHarm('spiritual_cost', 'spiritual', 'haji', 4, 'zann_strong')]
      ),
      mkOption(
        'opt-rent',
        'Continue renting',
        'Stay in a rental, save aggressively, revisit the question later.',
        [
          harm('money_property', 'mal', 'haji', 3, 'zann_strong', ['self', 'family']),
          help('serve_integrity', 'din', 'haji', 4, 'yaqin', ['self']),
          harm('family_future', 'nasl', 'tahsini', 2, 'zann', ['family']),
        ],
        [tahaHelp('spiritual_growth', 'spiritual', 'haji', 3, 'zann_strong')]
      ),
      mkOption(
        'opt-relocate',
        'Relocate to a market with Islamic financing',
        'Move to a country or region where genuine Islamic mortgages are available.',
        [
          help('serve_integrity', 'din', 'haji', 4, 'zann_strong', ['self']),
          harm('family_future', 'nasl', 'haji', 3, 'zann_strong', ['family']),
          harm('money_property', 'mal', 'haji', 4, 'zann_strong', ['self', 'family']),
          harm('mind_wellbeing', 'aql', 'tahsini', 3, 'zann', ['self', 'family']),
        ],
        []
      ),
    ],
    timeHorizon: 'months',
    reversibility: 2,
    stakes: {
      maqasid: { din: 5, nafs: 2, aql: 3, nasl: 4, mal: 5 },
      taha: { vital: 3, rational: 3, spiritual: 5 },
    },
  },
  claims: [
    {
      id: 'c-1',
      text: 'Genuine Islamic financing is unavailable or significantly more expensive in my market.',
      basis: 'single_source',
      confidence: 'zann_strong',
      sensitivity: true,
    },
    {
      id: 'c-2',
      text: 'Continued renting represents substantial cost over the relevant horizon.',
      basis: 'cumulative',
      confidence: 'zann_strong',
      sensitivity: false,
    },
    {
      id: 'c-3',
      text: 'I will be able to make payments without financial distress.',
      basis: 'cumulative',
      confidence: 'zann',
      sensitivity: true,
    },
  ],
  consultations: [
    {
      id: 'co-1',
      sourceId: 'Q.2.275',
      citation: 'Q. 2:275',
      bearsOnCase: 'yes',
      reasoning:
        'God permitted trade and forbade ribā. The majority position takes the conventional mortgage to engage ribā in its prohibited form.',
    },
    {
      id: 'co-2',
      sourceId: 'ibn-majah.2341',
      citation: 'Ibn Majah 2341',
      bearsOnCase: 'unsure',
      reasoning:
        'Some scholars invoke ḍarūra and harm-prevention as a basis for a minority permissive position for Muslims in markets without alternatives.',
      followsMinority: false,
    },
  ],
  niyya: {
    q1: 'I want to provide my family stable housing and, more deeply, to act in a way I do not have to hide from my Lord.',
    q2: 'I am not sure. Ownership has a strong worldly draw; I should test whether the stability claim survives that.',
    q3: 'I would prefer not to admit how much I want ownership for status reasons.',
    q4: 'I would say: I am genuinely facing pressure on housing, and I cannot reasonably wait fifteen years.',
    q5: 'My conscience asks me to first verify whether alternatives really do not exist before claiming necessity.',
    toneVariant: 'religious',
    leaningOptionId: 'opt-rent',
  },
};

export const EXAMPLES: WorkedExample[] = [
  { id: 'workplace-honesty', i18nKey: 'examples.workplace-honesty', deliberation: workplaceHonesty },
  { id: 'organ-donation', i18nKey: 'examples.organ-donation', deliberation: organDonation },
  { id: 'riba-mortgage', i18nKey: 'examples.riba-mortgage', deliberation: ribaMortgage },
];

export function getExample(id: WorkedExample['id']): WorkedExample | undefined {
  return EXAMPLES.find((e) => e.id === id);
}
