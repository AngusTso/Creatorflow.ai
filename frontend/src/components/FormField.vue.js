const __VLS_props = defineProps();
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "space-y-2" },
});
/** @type {__VLS_StyleScopedClasses['space-y-2']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex items-baseline justify-between gap-4" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-baseline']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-between']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-4']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.label, __VLS_intrinsics.label)({
    for: (__VLS_ctx.id),
    ...{ class: "text-sm font-medium text-slate-200" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-200']} */ ;
(__VLS_ctx.label);
if (__VLS_ctx.hintRight) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "text-xs whitespace-nowrap text-slate-500" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['whitespace-nowrap']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-500']} */ ;
    (__VLS_ctx.hintRight);
}
if (__VLS_ctx.hint) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: (`${__VLS_ctx.id}-hint`),
        ...{ class: "text-xs leading-relaxed text-slate-400" },
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
    (__VLS_ctx.hint);
}
var __VLS_0 = {};
if (__VLS_ctx.error) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
        id: (`${__VLS_ctx.id}-error`),
        ...{ class: "text-xs font-medium text-rose-300" },
        role: "alert",
    });
    /** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
    /** @type {__VLS_StyleScopedClasses['font-medium']} */ ;
    /** @type {__VLS_StyleScopedClasses['text-rose-300']} */ ;
    (__VLS_ctx.error);
}
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[id, id, id, label, hintRight, hintRight, hint, hint, error, error,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
});
const __VLS_export = {};
export default {};
