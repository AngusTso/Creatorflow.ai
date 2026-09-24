# CreatorFlow AI - Frontend

A small set of free AI tools for creators. This folder is the **frontend only**: three tools
backed by a tiny API module (`src/api/`) that calls the serverless functions in `../api`.
The Quote Assistant and the Script Analyzer are live. The Contract / TOS assistant is still
being built, so its page says "coming soon" instead of returning a fake draft.

## Stack

- Vue 3 (`<script setup>` + TypeScript)
- Vite
- Vue Router
- Tailwind CSS (via the `@tailwindcss/vite` plugin - no `tailwind.config.js` needed)
- Native `fetch()` for API calls

No UI library, no Pinia, no Axios.

## Run it locally

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

```bash
npm run build      # type-check (vue-tsc) + production build into dist/
npm run preview    # serve the production build locally
npm run type-check # types only
```

## Routes

| Path        | View                      | Purpose                                      |
| ----------- | ------------------------- | -------------------------------------------- |
| `/`         | `HomeView.vue`            | Short overview + links to the three tools    |
| `/quote`    | `QuoteView.vue`           | Quote Assistant                              |
| `/contract` | `ContractView.vue`        | Contract / TOS Assistant                     |
| `/script`   | `ScriptAnalyzerView.vue`  | Script Analyzer                              |
| `*`         | `NotFoundView.vue`        | Friendly 404                                 |

## Structure

```
src/
  api/          # API layer: one module per feature + shared fetch helper
    client.ts   #   API_BASE_URL, API_READY, ApiError, postJson()
    quote.ts    #   analyzeQuote()     -> POST /api/script/quote (api/script/quote.ts)
    contract.ts #   generateContract() -> POST /api/contract (endpoint not built yet)
    script.ts   #   analyzeScript()    -> POST /api/script/analyze
  components/   # AppHeader, AppFooter, PageHeader, FormField, BaseButton, ResultPanel
  views/        # one component per route
  styles/       # main.css (Tailwind entry + a few shared base styles)
  router.ts     # routes, page titles, scroll behaviour
  App.vue       # header + <RouterView> + footer layout
  main.ts       # creates the app
```

## Backend endpoints

The endpoints are Vercel serverless functions in the `api/` folder at the repository root. The paths
below are what the frontend calls.

1. `api/script/analyze.ts` -> `POST /api/script/analyze` - Script Analyzer (connected).
2. `api/script/quote.ts` -> `POST /api/script/quote` - Quote Assistant (connected, uses the
   `calculateQuote()` helper in the same folder).
3. `api/contract.ts` - not built yet: the Contract / TOS page shows a "coming soon" message and the
   form is there to show what the tool will need.
4. `/api/*` only runs through Vercel, so test the AI features with `vercel dev` from the repository
   root (with `OPENROUTER_API_KEY` set) instead of plain `npm run dev`.
