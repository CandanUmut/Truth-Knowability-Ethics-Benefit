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
  type DeliberationMode,
  type NiyyaCheck,
  type SourceConsultation,
  type TruthClaim,
} from '@/types/deliberation';

export type StepIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * Step semantics:
 *  0 = no active deliberation (landing)
 *  1..5 = the five deliberation steps
 *  6 = quick review of smart defaults before the dossier
 *  7 = dossier output
 */
export const REVIEW_STEP: StepIndex = 6;
export const OUTPUT_STEP: StepIndex = 7;
export const FINAL_STEP: StepIndex = 5;

type SessionState = {
  current: Deliberation | null;
  step: StepIndex;
  /** Sub-step within the current major step. Reset to 1 whenever step changes. */
  subStep: number;
  start: (mode?: DeliberationMode) => Deliberation;
  /** Save current to Dexie via auto-save and create a fresh deliberation. */
  startAnother: (mode?: DeliberationMode) => Deliberation;
  reset: () => void;
  setStep: (step: StepIndex) => void;
  advanceStep: () => void;
  retreatStep: () => void;
  setSubStep: (subStep: number) => void;
  /** Switch the active deliberation to a different mode (e.g. quick → deep on refine). */
  setMode: (mode: DeliberationMode) => void;
  updateCase: (patch: Partial<DeliberationCase>) => void;
  setClaims: (claims: TruthClaim[]) => void;
  setConsultations: (consultations: SourceConsultation[]) => void;
  setNiyya: (niyya: NiyyaCheck) => void;
  loadFromHistory: (deliberation: Deliberation) => void;
};

function newDeliberation(mode: DeliberationMode = 'deep'): Deliberation {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    status: 'draft',
    mode,
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
      start: (mode = 'deep') => {
        const fresh = newDeliberation(mode);
        set({ current: fresh, step: 1, subStep: 1 });
        return fresh;
      },
      startAnother: (mode = 'deep') => {
        const fresh = newDeliberation(mode);
        set({ current: fresh, step: 1, subStep: 1 });
        return fresh;
      },
      reset: () => set({ current: null, step: 0, subStep: 1 }),
      setStep: (step) => set({ step, subStep: 1 }),
      advanceStep: () => {
        const next = Math.min(7, get().step + 1) as StepIndex;
        set({ step: next, subStep: 1 });
      },
      retreatStep: () => {
        const prev = Math.max(1, get().step - 1) as StepIndex;
        set({ step: prev, subStep: 99 }); // 99 = "last sub-step"; each step normalizes
      },
      setSubStep: (subStep) => set({ subStep }),
      setMode: (mode) => {
        const cur = get().current;
        if (!cur) return;
        set({ current: touch({ ...cur, mode }) });
      },
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
