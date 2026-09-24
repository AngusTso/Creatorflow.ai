// Temporary verification of the reworded messages + contract behaviour. Deleted after the run.
import { createServer } from 'vite'
import { createSSRApp, h } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory, createRouter } from 'vue-router'

const server = await createServer({ logLevel: 'warn', hmr: false, server: { middlewareMode: true } })
let failures = 0
const check = (name, ok, extra = '') => {
  if (!ok) failures += 1
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${extra ? ' -> ' + extra : ''}`)
}

const calls = []
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { 'Content-Type': 'application/json' } })
let respond = () => json({})
globalThis.fetch = async (url) => {
  calls.push(url)
  return respond()
}

// ---- Contract: friendly "coming soon", and no request is sent ---------------
const { generateContract } = await server.ssrLoadModule('/src/api/contract.ts')
try {
  await generateContract({
    projectDescription: 'A 30 second ad',
    paymentTerms: '',
    revisionTerms: '',
    cancellationTerms: '',
    deliveryTerms: '',
  })
  check('contract reports coming soon', false, 'did not throw')
} catch (error) {
  check(
    'contract reports coming soon',
    error.message.includes('coming soon') && error.message.includes('/api/contract'),
    error.message,
  )
  check('contract sends no request', calls.length === 0, `${calls.length} call(s)`)
}

// ---- Quote + Script still reach their live endpoints -----------------------
const { analyzeQuote } = await server.ssrLoadModule('/src/api/quote.ts')
const { analyzeScript } = await server.ssrLoadModule('/src/api/script.ts')

respond = () => json({ currency: 'USD', hourlyRate: 50, hours: 4, total: 200, summary: 'ok' })
await analyzeQuote({ projectDescription: 'x', currency: 'USD' })
check('quote still posts to /api/script/quote', calls.at(-1) === '/api/script/quote', calls.at(-1))

respond = () => json({ analysis: {}, wordCount: 1, characterCount: 1 })
await analyzeScript({ script: 'hi' })
check('script still posts to /api/script/analyze', calls.at(-1) === '/api/script/analyze', calls.at(-1))

// ---- Rendered copy ---------------------------------------------------------
const stub = { render: () => null }

async function render(path) {
  const { default: View } = await server.ssrLoadModule(path)
  const router = createRouter({
    history: createMemoryHistory(),
    // Named routes so the RouterLinks in AppHeader can resolve (the real router
    // uses web history, which needs a browser).
    routes: [
      { path: '/', name: 'home', component: stub },
      { path: '/quote', name: 'quote', component: stub },
      { path: '/contract', name: 'contract', component: stub },
      { path: '/script', name: 'script', component: stub },
      { path: '/:pathMatch(.*)*', name: 'not-found', component: View },
    ],
  })
  await router.push('/')
  await router.isReady()
  const app = createSSRApp({ render: () => h(View) })
  app.use(router)
  return await renderToString(app)
}

const expected = [
  ['/src/App.vue', ['free tools for creators', 'No account needed', 'not legal, financial or professional advice', 'Terms drafting is coming soon']],
  ['/src/views/HomeView.vue', ['free AI tools', 'Coming soon', 'Quote Assistant and Script Analyzer are live', 'still being built']],
  ['/src/views/ContractView.vue', ['Coming soon:', 'the terms generator is not built yet', 'not legal advice']],
  ['/src/views/QuoteView.vue', ['never guesses the final price', 'Generate quote']],
  ['/src/views/ScriptAnalyzerView.vue', ['Analyze script']],
  ['/src/views/NotFoundView.vue', ['Page not found']],
]
for (const [path, texts] of expected) {
  const html = await render(path)
  const missing = texts.filter((text) => !html.includes(text))
  check(`copy in ${path}`, missing.length === 0, missing.length ? `missing ${missing.join(' | ')}` : 'ok')
}

// ---- Old wording must be gone ---------------------------------------------
const staleText = ['portfolio project', 'not connected yet', 'API not implemented yet', 'Python calculator']
for (const path of expected.map(([p]) => p)) {
  const mod = await server.ssrLoadModule(path)
  void mod
}
const { readdir, readFile } = await import('node:fs/promises')
const files = []
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = `${dir}/${entry.name}`
    if (entry.isDirectory()) await walk(full)
    else files.push(full)
  }
}
await walk('src')
for (const phrase of staleText) {
  const hits = []
  for (const file of files) {
    if ((await readFile(file, 'utf8')).includes(phrase)) hits.push(file)
  }
  check(`no stale wording "${phrase}"`, hits.length === 0, hits.join(', '))
}

await server.close()
console.log(failures === 0 ? 'ALL CHECKS PASSED' : `${failures} CHECK(S) FAILED`)
process.exit(failures === 0 ? 0 : 1)
