<script setup lang="ts">
import { RouterLink } from "vue-router";

/** Cards for the three tools. `path` values match the routes. */
const features: {
  path: string;
  title: string;
  description: string;
  badge?: string;
}[] = [
  {
    path: "/quote",
    title: "Quote Assistant",
    description:
      "Describe a project. The AI estimates the hours, and a small calculator turns them into a transparent quote - the AI never guesses the numbers.",
  },
  {
    path: "/contract",
    title: "Contract / TOS Assistant",
    description:
      "Turn your project and terms into a first draft of business terms, grounded in your own policy knowledge base.",
    badge: "Coming soon",
  },
  {
    path: "/script",
    title: "Script Analyzer",
    description:
      "Paste a voice script and get a structured read: summary, tone, emotion, vocal difficulty and voice direction.",
  },
];
</script>

<template>
  <div>
    <!-- Hero: left-aligned with a slightly rotated stamp on the right. -->
    <section class="relative mb-14 sm:mb-16">
      <p class="eyebrow mb-5">
        <span
          class="inline-block size-1.5 rounded-full bg-clay"
          aria-hidden="true"
        ></span>
        Free AI tools for working creators
      </p>

      <h1
        class="font-display text-[2.75rem] leading-[0.98] font-black tracking-[-0.025em] text-forest sm:text-[4.1rem]"
      >
        CreatorFlow<br />
        <em class="text-rust">AI</em>
      </h1>

      <p class="mt-6 max-w-xl text-base leading-relaxed text-forest/75">
        A small set of free AI tools for client communication. Quote a project,
        check a voice script or draft your terms - you always review the final
        answer before a client sees it.
      </p>

      <!-- Rubber-stamp note, slightly crooked on purpose. -->
      <div
        class="absolute -top-2 right-0 hidden -rotate-6 border-2 border-rust/50 px-4 py-2.5 text-center lg:block"
        aria-hidden="true"
      >
        <span
          class="block text-[0.62rem] font-bold tracking-[0.2em] text-rust uppercase"
          >No account</span
        >
        <span
          class="block text-[0.62rem] font-bold tracking-[0.2em] text-rust uppercase"
          >needed</span
        >
      </div>
    </section>

    <!-- The three tools, each with its own treatment. -->
    <section aria-labelledby="tools-heading">
      <h2 id="tools-heading" class="eyebrow mb-6 text-forest/55">
        <span
          class="inline-block size-1.5 rounded-full bg-sage"
          aria-hidden="true"
        ></span>
        The three tools
      </h2>

      <ol class="grid gap-4 sm:grid-cols-2">
        <!-- 01 - the big one. -->
        <li class="sm:col-span-2">
          <RouterLink
            :to="features[0].path"
            class="group grid gap-2 rounded-lg border border-forest/15 bg-paper p-6 transition-colors hover:border-clay/70 sm:grid-cols-[auto_1fr] sm:gap-7 sm:p-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust/50"
          >
            <span
              class="font-display text-3xl leading-none font-black text-clay/80 italic select-none"
              aria-hidden="true"
            >
              01
            </span>
            <div>
              <h3
                class="font-display text-2xl leading-tight font-black text-forest sm:text-[1.75rem]"
              >
                {{ features[0].title }}
              </h3>
              <p class="mt-2 max-w-2xl text-sm leading-relaxed text-forest/70">
                {{ features[0].description }}
              </p>
              <span class="mt-4 inline-block text-sm font-bold text-rust">
                Open tool
                <span
                  class="inline-block transition-transform group-hover:translate-x-1"
                  >&rarr;</span
                >
              </span>
            </div>
          </RouterLink>
        </li>

        <!-- 02 - soft sage panel with a coming-soon stamp. -->
        <li>
          <RouterLink
            :to="features[1].path"
            class="group relative flex h-full flex-col rounded-lg border border-dashed border-forest/30 bg-sage/30 p-6 transition-colors hover:border-solid hover:border-clay/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust/50"
          >
            <span
              class="font-display text-3xl leading-none font-black text-clay/80 italic select-none"
              aria-hidden="true"
            >
              02
            </span>
            <h3
              class="mt-2 font-display text-xl leading-tight font-black text-forest"
            >
              {{ features[1].title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-forest/70">
              {{ features[1].description }}
            </p>
            <span
              v-if="features[1].badge"
              class="mt-5 inline-block w-fit -rotate-2 border-2 border-rust/60 px-2.5 py-1 text-[0.62rem] font-bold tracking-[0.18em] text-rust uppercase"
            >
              {{ features[1].badge }}
            </span>
          </RouterLink>
        </li>

        <!-- 3 - plain and typographic, no card. -->
        <li class="border-t-2 border-forest/25 pt-6">
          <RouterLink
            :to="features[2].path"
            class="group flex h-full flex-col px-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rust/50"
          >
            <span
              class="font-display text-3xl leading-none font-black text-clay/80 italic select-none"
              aria-hidden="true"
            >
              03
            </span>
            <h3
              class="mt-2 font-display text-xl leading-tight font-black text-forest"
            >
              {{ features[2].title }}
            </h3>
            <p class="mt-2 flex-1 text-sm leading-relaxed text-forest/70">
              {{ features[2].description }}
            </p>
            <span class="mt-4 inline-block text-sm font-bold text-rust">
              Open tool
              <span
                class="inline-block transition-transform group-hover:translate-x-1"
                >&rarr;</span
              >
            </span>
          </RouterLink>
        </li>
      </ol>
    </section>

    <p
      class="mt-14 max-w-2xl border-l-[3px] border-clay/70 pl-5 text-xs leading-relaxed text-forest/65"
    >
      <span class="font-bold text-forest">Status:</span> the Quote Assistant and
      Script Analyzer are live - each one calls a small serverless function that
      talks to an AI model. The Contract / TOS assistant is still being built,
      so its page tells you that instead of inventing terms.
    </p>
  </div>
</template>
