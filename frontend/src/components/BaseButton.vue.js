import { computed } from 'vue';
const props = withDefaults(defineProps(), {
    type: 'submit',
    variant: 'primary',
    loading: false,
    disabled: false,
});
const variantClasses = {
    primary: 'bg-indigo-500 text-white hover:bg-indigo-400 focus-visible:outline-indigo-400 disabled:bg-slate-700 disabled:text-slate-400',
    secondary: 'border border-slate-700 bg-slate-900 text-slate-200 hover:border-slate-500 hover:text-white focus-visible:outline-slate-400 disabled:text-slate-500',
};
const classes = computed(() => variantClasses[props.variant]);
const __VLS_defaults = {
    type: 'submit',
    variant: 'primary',
    loading: false,
    disabled: false,
};
const __VLS_ctx = {
    ...{},
    ...{},
    ...{},
    ...{},
};
let __VLS_components;
let __VLS_intrinsics;
let __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)({
    type: (__VLS_ctx.type),
    disabled: (__VLS_ctx.disabled || __VLS_ctx.loading),
    'aria-busy': (__VLS_ctx.loading),
    ...{ class: "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed" },
    ...{ class: (__VLS_ctx.classes) },
});
/** @type {__VLS_StyleScopedClasses['inline-flex']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['justify-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-2']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['px-4']} */ ;
/** @type {__VLS_StyleScopedClasses['py-2.5']} */ ;
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['font-semibold']} */ ;
/** @type {__VLS_StyleScopedClasses['transition-colors']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:outline-2']} */ ;
/** @type {__VLS_StyleScopedClasses['focus-visible:outline-offset-2']} */ ;
/** @type {__VLS_StyleScopedClasses['disabled:cursor-not-allowed']} */ ;
if (__VLS_ctx.loading) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)({
        ...{ class: "size-4 animate-spin rounded-full border-2 border-current border-t-transparent" },
        'aria-hidden': "true",
    });
    /** @type {__VLS_StyleScopedClasses['size-4']} */ ;
    /** @type {__VLS_StyleScopedClasses['animate-spin']} */ ;
    /** @type {__VLS_StyleScopedClasses['rounded-full']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-2']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-current']} */ ;
    /** @type {__VLS_StyleScopedClasses['border-t-transparent']} */ ;
}
var __VLS_0 = {};
// @ts-ignore
var __VLS_1 = __VLS_0;
// @ts-ignore
[type, disabled, loading, loading, loading, classes,];
const __VLS_base = (await import('vue')).defineComponent({
    __typeProps: {},
    props: {},
});
const __VLS_export = {};
export default {};
