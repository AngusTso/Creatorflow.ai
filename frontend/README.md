# CreatorFlow AI - Frontend

Small AI assistant for client communication. This folder is the **frontend only**:
three tools backed by a tiny API module. The Python/AI backend is a later step, so the
pages currently answer with an "API not implemented yet" error instead of fake results.

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
    quote.ts    #   analyzeQuote()     -> POST /api/quote
    contract.ts #   generateContract() -> POST /api/contract
    script.ts   #   analyzeScript()    -> POST /api/script/analyze
  components/   # AppHeader, AppFooter, PageHeader, FormField, BaseButton, ResultPanel
  views/        # one component per route
  styles/       # main.css (Tailwind entry + a few shared base styles)
  router.ts     # routes, page titles, scroll behaviour
  App.vue       # header + <RouterView> + footer layout
  main.ts       # creates the app
```

## Connecting the backend later

1. Build the endpoints (`POST /api/quote`, `POST /api/contract`, `POST /api/script/analyze`).
2. In `src/api/client.ts` set `API_READY = true` (and point `API_BASE_URL` at the deployed API).
3. In development, add a Vite dev proxy (or run the API on `/api`) so the browser can reach it.
4. Render the returned payload in each page's `ResultPanel` instead of the placeholder text.
