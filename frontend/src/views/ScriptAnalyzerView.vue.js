import { computed, reactive, ref } from 'vue';
import { analyzeScript } from '../api/script';
import BaseButton from '../components/BaseButton.vue';
import FormField from '../components/FormField.vue';
import PageHeader from '../components/PageHeader.vue';
import ResultPanel from '../components/ResultPanel.vue';
const form = reactive({ script: '' });
const errors = reactive({ script: '' });
const status = ref('idle');
const errorMessage = ref('');
/** Counted in the browser - that is not AI work, so it does not need the backend. */
const characterCount = computed(() => form.script.length);
const wordCount = computed(() => form.script.trim() === '' ? 0 : form.script.trim().split(/\s+/).length);
function handleClear() {
    form.script = '';
    errors.script = '';
    status.value = 'idle';
    errorMessage.value = '';
}
async function handleSubmit() {
    errors.script = form.script.trim() === '' ? 'Paste a script before analyzing.' : '';
    if (errors.script !== '') {
        return;
    }
    const request = { script: form.script.trim() };
    status.value = 'loading';
    errorMessage.value = '';
    try {
        // The backend is not connected yet, so this always throws for now.
        await analyzeScript(request);
        // The analysis will be rendered here once the AI step exists.
        status.value = 'idle';
    }
    catch (error) {
        errorMessage.value = error instanceof Error ? error.message : 'Something went wrong.';
        status.value = 'error';
    }
}
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
    title: "Script Analyzer",
    description: "Paste a voice script and let CreatorFlow AI describe what the performance needs: the story, the tone and emotion, how hard it is vocally, who the voice should sound like, and how much work the job is.",
}));
const __VLS_2 = __VLS_1({
    title: "Script Analyzer",
    description: "Paste a voice script and let CreatorFlow AI describe what the performance needs: the story, the tone and emotion, how hard it is vocally, who the voice should sound like, and how much work the job is.",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    ...{ class: "space-y-6" },
    novalidate: true,
});
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
const __VLS_5 = FormField || FormField;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    id: "script-text",
    label: "Script text",
    hint: "Paste the lines you were asked to record. Stage directions are fine to keep.",
    error: (__VLS_ctx.errors.script),
    hintRight: (`${__VLS_ctx.wordCount} words · ${__VLS_ctx.characterCount} characters`),
}));
const __VLS_7 = __VLS_6({
    id: "script-text",
    label: "Script text",
    hint: "Paste the lines you were asked to record. Stage directions are fine to keep.",
    error: (__VLS_ctx.errors.script),
    hintRight: (`${__VLS_ctx.wordCount} words · ${__VLS_ctx.characterCount} characters`),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_10 } = __VLS_8.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.textarea, __VLS_intrinsics.textarea)({
    id: "script-text",
    value: (__VLS_ctx.form.script),
    ...{ class: "field-input font-mono" },
    rows: "12",
    placeholder: "Paste your script here...",
    'aria-describedby': "script-text-hint",
    'aria-invalid': (__VLS_ctx.errors.script !== ''),
});
/** @type {__VLS_StyleScopedClasses['field-input']} */ ;
/** @type {__VLS_StyleScopedClasses['font-mono']} */ ;
// @ts-ignore
[handleSubmit, errors, errors, wordCount, characterCount, form,];
var __VLS_8;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "flex flex-wrap items-center gap-3" },
});
/** @type {__VLS_StyleScopedClasses['flex']} */ ;
/** @type {__VLS_StyleScopedClasses['flex-wrap']} */ ;
/** @type {__VLS_StyleScopedClasses['items-center']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-3']} */ ;
const __VLS_11 = BaseButton || BaseButton;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    type: "submit",
    loading: (__VLS_ctx.status === 'loading'),
}));
const __VLS_13 = __VLS_12({
    type: "submit",
    loading: (__VLS_ctx.status === 'loading'),
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_16 } = __VLS_14.slots;
// @ts-ignore
[status,];
var __VLS_14;
const __VLS_17 = BaseButton || BaseButton;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    ...{ 'onClick': {} },
    type: "button",
    variant: "secondary",
    disabled: (__VLS_ctx.form.script === ''),
}));
const __VLS_19 = __VLS_18({
    ...{ 'onClick': {} },
    type: "button",
    variant: "secondary",
    disabled: (__VLS_ctx.form.script === ''),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
let __VLS_22;
const __VLS_23 = {
    /** @type {typeof __VLS_22.click} */
    onClick: (__VLS_ctx.handleClear),
};
const { default: __VLS_24 } = __VLS_20.slots;
// @ts-ignore
[form, handleClear,];
var __VLS_20;
var __VLS_21;
const __VLS_25 = ResultPanel || ResultPanel;
// @ts-ignore
const __VLS_26 = __VLS_asFunctionalComponent1(__VLS_25, new __VLS_25({
    ...{ class: "mt-8" },
    title: "Script analysis",
    status: (__VLS_ctx.status),
    errorMessage: (__VLS_ctx.errorMessage),
    loadingMessage: "Analyzing the script...",
}));
const __VLS_27 = __VLS_26({
    ...{ class: "mt-8" },
    title: "Script analysis",
    status: (__VLS_ctx.status),
    errorMessage: (__VLS_ctx.errorMessage),
    loadingMessage: "Analyzing the script...",
}, ...__VLS_functionalComponentArgsRest(__VLS_26));
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
const { default: __VLS_30 } = __VLS_28.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "text-sm text-slate-400" },
});
/** @type {__VLS_StyleScopedClasses['text-sm']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-400']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mt-2 text-xs leading-relaxed text-slate-500" },
});
/** @type {__VLS_StyleScopedClasses['mt-2']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-slate-500']} */ ;
// @ts-ignore
[status, errorMessage,];
var __VLS_28;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
