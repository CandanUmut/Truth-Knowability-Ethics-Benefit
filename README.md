# Truth · Ethics · Benefit — Deliberation

A bilingual (Turkish + English), client-side-only web application that walks the user through a structured deliberation when she faces a difficult decision. The user enters a dilemma; the app asks her structured questions across five steps; at the end, the app returns a *deliberation map* — not a verdict.

This is **not** a *fatwā* generator, **not** a chatbot, **not** an AI advisor. It is a structured reflection tool. The user makes the decision. The app structures her thinking.

The user's data never leaves her device. There is no server, no analytics, no tracking, no account system. localStorage and IndexedDB only. Export-as-JSON for portability.

The application implements the framework defined in the working paper *Truth, Ethics, and Benefit: A Multi-Source Framework for Practical Deliberation* by Umut Candan. See `research/truth-ethics-benefit-preprint.md` for the full text.

## Stack

- Vite + React 18 + TypeScript (strict)
- Tailwind CSS v3 + shadcn/ui primitives
- Framer Motion for transitions
- react-i18next (TR default, EN fallback)
- Zustand (preferences) + Dexie (history)
- React Router v6

## Local development

```bash
npm install
npm run dev
```

Other scripts:

```bash
npm run build        # production build
npm run preview      # preview the production build locally
npm run typecheck    # strict TypeScript check
npm run lint         # ESLint, zero warnings
npm run test         # vitest, single run
npm run test:watch   # vitest in watch mode
```

## Privacy

No fetch() to external services in production. No analytics. No telemetry. No CDN dependencies. Inter and Noto Naskh Arabic fonts are hosted locally in `public/fonts/`. See `/privacy` in the running application for the full statement.

## License

Apache-2.0. See `LICENSE`.
