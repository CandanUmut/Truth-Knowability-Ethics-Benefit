/**
 * Active deliberation session — persisted to localStorage so a refresh
 * does not lose work-in-progress. This is for the *active* draft only;
 * saved (final / explicit-draft) deliberations live in IndexedDB via Dexie.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  emptyCase,
  emptyNiyya,
  type Deliberation,
  type DeliberationCase,
  type NiyyaCheck,
  type SourceConsultation,
  type TruthClaim,
} from '@/types/deliberation';

export type StepIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

type SessionState = {
  current: Deliberation | null;
  step: StepIndex;
  /** Sub-step within the current major step. Reset to 1 whenever step changes. */
  subStep: number;
  start: () => Deliberation;
  reset: () => void;
  setStep: (step: StepIndex) => void;
  advanceStep: () => void;
  retreatStep: () => void;
  setSubStep: (subStep: number) => void;
  updateCase: (patch: Partial<DeliberationCase>) => void;
  setClaims: (claims: TruthClaim[]) => void;
  setConsultations: (consultations: SourceConsultation[]) => void;
  setNiyya: (niyya: NiyyaCheck) => void;
  loadFromHistory: (deliberation: Deliberation) => void;
};

function newDeliberation(): Deliberation {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    status: 'draft',
    case: emptyCase(),
    claims: [],
    consultations: [],
    niyya: emptyNiyya(),
  };
}

function touch<T extends Deliberation>(d: T): T {
  return { ...d, updatedAt: new Date().toISOString() };
}

export const useSession = create<SessionState>()(
  persist(
    (set, get) => ({
      current: null,
      step: 0,
      subStep: 1,
      start: () => {
        const fresh = newDeliberation();
        set({ current: fresh, step: 1, subStep: 1 });
        return fresh;
      },
      reset: () => set({ current: null, step: 0, subStep: 1 }),
      setStep: (step) => set({ step, subStep: 1 }),
      advanceStep: () => {
        const next = Math.min(6, get().step + 1) as StepIndex;
        set({ step: next, subStep: 1 });
      },
      retreatStep: () => {
        const prev = Math.max(1, get().step - 1) as StepIndex;
        set({ step: prev, subStep: 99 }); // 99 = "last sub-step"; each step normalizes
      },
      setSubStep: (subStep) => set({ subStep }),
      updateCase: (patch) => {
        const cur = get().current;
        if (!cur) return;
        set({
          current: touch({
            ...cur,
            case: { ...cur.case, ...patch },
          }),
        });
      },
      setClaims: (claims) => {
        const cur = get().current;
        if (!cur) return;
        set({ current: touch({ ...cur, claims }) });
      },
      setConsultations: (consultations) => {
        const cur = get().current;
        if (!cur) return;
        set({ current: touch({ ...cur, consultations }) });
      },
      setNiyya: (niyya) => {
        const cur = get().current;
        if (!cur) return;
        set({ current: touch({ ...cur, niyya }) });
      },
      loadFromHistory: (deliberation) => {
        set({ current: deliberation, step: 1, subStep: 1 });
      },
    }),
    {
      name: 'teb.session.active',
      partialize: (state) => ({ current: state.current, step: state.step, subStep: state.subStep }),
    }
  )
);
