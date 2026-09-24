const __VLS_props = defineProps();
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)({
    ...{ class: "rounded-xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6" },
    'aria-live': "polite",
    'aria-busy': (__VLS_ctx.status === 'loading'),
});
/** @type {__VLS_StyleScopedClasses['rounded-xl']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-slate-800']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-slate-900/50']} */ ;
/** @type {__VLS_StyleScopedClasses['p-5']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:p-6']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h2, __VLS_intrinsics.h2)({
    ...{ class: "text-xs font-semibold tracking-wide text-slate-400 uppercase" },
});
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['tracking-wide']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
/** @type {__VLS_StyleScopedClasses['uppercase']} */ ;
(__VLS_ctx.title);
if (__VLS_ctx.status === 'loading') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-4 flex items-center gap-3 text-sm text-slate-300" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['flex']} */ ;
    /** @type {__VLS_StyleScopedClasses['items-center']} */ ;
    /** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-300']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "size-4 shrink-0 animate-spin rounded-full border-2 border-slate-500 border-t-transparent" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['shrink-0']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-slate-500']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-t-transparent']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({});
    (__VLS_ctx.loadingMessage ?? 'Working on it...');
}
else if (__VLS_ctx.status === 'error') {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-4 rounded-lg border border-rose-500/40 bg-rose-500/10 p-4" },
        role: "alert",
    });
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
    /** @type {__VLS_StyleScopedClasses['border']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-rose-500/40']} */ ;
    /** @type {__VLS_StyleScopedClasses['bg-rose-500/10']} */ ;
    /** @type {__VLS_StyleScopedClasses['p-4']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "text-sm font-semibold text-rose-200" },
    });
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-rose-200']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        ...{ class: "mt-1 text-sm leading-relaxed text-rose-100/90" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-1']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-rose-100/90']} */ ;
    (__VLS_ctx.errorMessage);
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
        ...{ class: "mt-4" },
    });
    /** @type {__VLS_StyleScopedClasses['mt-4']} */ ;
    var __VLS_0 = {};
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[status, status, status, title, loadingMessage, errorMessage,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
