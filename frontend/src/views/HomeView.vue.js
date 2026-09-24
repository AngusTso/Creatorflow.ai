import { RouterLink } from 'vue-router';
import PageHeader from '../components/PageHeader.vue';
/** Cards for the three MVP features. `path` values match the routes. */
const features = [
    {
        path: '/quote',
        title: 'Quote Assistant',
        description: 'Describe a project. The AI pulls out the requirements and a small Python calculator turns them into a transparent estimate.',
    },
    {
        path: '/contract',
        title: 'Contract / TOS Assistant',
        description: 'Turn your project and terms into a first draft of business terms, grounded in your own policy knowledge base.',
    },
    {
        path: '/script',
        title: 'Script Analyzer',
        description: 'Paste a voice script and get a structured read: summary, tone, emotion, vocal difficulty and voice direction.',
    },
];
const __VLS_ctx = {
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({});
const __VLS_0 = PageHeader;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
    title: "CreatorFlow AI",
    description: "A small AI assistant for client communication. Three tools that help creators answer client questions faster, while you stay in control of the final answer.",
}));
const __VLS_2 = __VLS_1({
    title: "CreatorFlow AI",
    description: "A small AI assistant for client communication. Three tools that help creators answer client questions faster, while you stay in control of the final answer.",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.ul, __VLS_intrinsics.ul)({
    ...{ class: "grid gap-4 sm:grid-cols-3" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-3']} */ ;
for (const [feature] of __VLS_vFor((__VLS_ctx.features))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.li, __VLS_intrinsics.li)({
        key: (feature.path),
    });
    let __VLS_5;
    /** @ts-ignore @type { | typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
        to: (feature.path),
        ...{ class: "flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-indigo-500/60 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400" },
    }));
    const __VLS_7 = __VLS_6({
        to: (feature.path),
        ...{ class: "flex h-full flex-col rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition-colors hover:border-indigo-500/60 hover:bg-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400" },
    }, ...__VLS_functionalComponentArgsRest(__VLS_6));
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['h-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-col']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-slate-800']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-slate-900/50']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-5']} */ ;
    /** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:border-indigo-500/60']} */ ;
    /** @type {__VLS_StyleScopedClasses['hover:bg-slate-900']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus-visible:outline-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus-visible:outline-offset-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['focus-visible:outline-indigo-400']} */ ;
    const { default: __VLS_10 } = __VLS_8.slots;
    __VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
        ...{ class: "text-base font-semibold text-white" },
    });
    /** @type {__VLS_StyleScopedClasses['text-base']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-white']} */ ;
    (feature.title);
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-2 flex-1 text-sm leading-relaxed text-slate-400" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
    (feature.description);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "mt-4 text-sm font-medium text-indigo-300" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-indigo-300']} */ ;
    // @ts-ignore
    [features,];
    var __VLS_8;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mt-8 rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-xs leading-relaxed text-slate-400" },
});
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-slate-800']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-slate-900/40']} */ ;
/** @type {__VLS_StyleScopedClasses['p-4']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "font-semibold text-slate-300" },
});
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.code, __VLS_intrinsics.code)({
    ...{ class: "text-slate-300" },
});
/** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
    ...{ class: "text-slate-300" },
});
/** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
