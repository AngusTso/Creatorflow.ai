import { reactive, ref } from 'vue';
import { CURRENCIES, analyzeQuote } from '../api/quote';
import BaseButton from '../components/BaseButton.vue';
import FormField from '../components/FormField.vue';
import PageHeader from '../components/PageHeader.vue';
import ResultPanel from '../components/ResultPanel.vue';
const form = reactive({
    projectDescription: '',
    currency: 'USD',
    /** Kept as a string because it is bound to a text/number input. */
    hourlyRate: '',
});
const errors = reactive({
    projectDescription: '',
    hourlyRate: '',
});
const status = ref('idle');
const errorMessage = ref('');
function validate() {
    errors.projectDescription =
        form.projectDescription.trim() === '' ? 'Describe your project before generating a quote.' : '';
    const rawRate = form.hourlyRate.trim();
    errors.hourlyRate =
        rawRate !== '' && !(Number(rawRate) > 0) ? 'Use a positive number, or leave this empty.' : '';
    return errors.projectDescription === '' && errors.hourlyRate === '';
}
async function handleSubmit() {
    if (!validate()) {
        return;
    }
    const request = {
        projectDescription: form.projectDescription.trim(),
        currency: form.currency,
        hourlyRate: form.hourlyRate.trim() === '' ? undefined : Number(form.hourlyRate),
    };
    status.value = 'loading';
    errorMessage.value = '';
    try {
        // The backend is not connected yet, so this always throws for now.
        await analyzeQuote(request);
        // The estimate will be rendered here once the Python calculator exists.
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
    title: "Quote Assistant",
    description: "Describe the project in your own words. CreatorFlow AI extracts the requirements first, and a deterministic Python calculator turns them into an estimate - no guesswork, the maths is code.",
}));
const __VLS_2 = __VLS_1({
    title: "Quote Assistant",
    description: "Describe the project in your own words. CreatorFlow AI extracts the requirements first, and a deterministic Python calculator turns them into an estimate - no guesswork, the maths is code.",
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
    id: "quote-project",
    label: "Describe your project",
    hint: "What is the job, how long is it, and anything the client asked for. Plain language is fine.",
    error: (__VLS_ctx.errors.projectDescription),
}));
const __VLS_7 = __VLS_6({
    id: "quote-project",
    label: "Describe your project",
    hint: "What is the job, how long is it, and anything the client asked for. Plain language is fine.",
    error: (__VLS_ctx.errors.projectDescription),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_10 } = __VLS_8.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.textarea, __VLS_intrinsics.textarea)({
    id: "quote-project",
    value: (__VLS_ctx.form.projectDescription),
    ...{ class: "field-input" },
    rows: "8",
    placeholder: "Describe your project...",
    'aria-describedby': "quote-project-hint",
    'aria-invalid': (__VLS_ctx.errors.projectDescription !== ''),
});
/** @type {__VLS_StyleScopedClasses['field-input']} */ ;
// @ts-ignore
[handleSubmit, errors, errors, form,];
var __VLS_8;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)({
    ...{ class: "grid gap-6 sm:grid-cols-2" },
});
/** @type {__VLS_StyleScopedClasses['grid']} */ ;
/** @type {__VLS_StyleScopedClasses['gap-6']} */ ;
/** @type {__VLS_StyleScopedClasses['sm:grid-cols-2']} */ ;
const __VLS_11 = FormField || FormField;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    id: "quote-currency",
    label: "Currency",
    hint: "Optional - defaults to USD.",
}));
const __VLS_13 = __VLS_12({
    id: "quote-currency",
    label: "Currency",
    hint: "Optional - defaults to USD.",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_16 } = __VLS_14.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.select, __VLS_intrinsics.select)({
    id: "quote-currency",
    value: (__VLS_ctx.form.currency),
    ...{ class: "field-input" },
});
/** @type {__VLS_StyleScopedClasses['field-input']} */ ;
for (const [currency] of __VLS_vFor((__VLS_ctx.CURRENCIES))) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.option, __VLS_intrinsics.option)({
        key: (currency),
        value: (currency),
    });
    (currency);
    // @ts-ignore
    [form, CURRENCIES,];
}
// @ts-ignore
[];
var __VLS_14;
const __VLS_17 = FormField || FormField;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    id: "quote-rate",
    label: "Your hourly rate",
    hint: "Optional - leave empty to let the backend use its own default.",
    error: (__VLS_ctx.errors.hourlyRate),
}));
const __VLS_19 = __VLS_18({
    id: "quote-rate",
    label: "Your hourly rate",
    hint: "Optional - leave empty to let the backend use its own default.",
    error: (__VLS_ctx.errors.hourlyRate),
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
const { default: __VLS_22 } = __VLS_20.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "quote-rate",
    ...{ class: "field-input" },
    type: "number",
    min: "1",
    step: "1",
    inputmode: "decimal",
    placeholder: "e.g. 500",
    'aria-invalid': (__VLS_ctx.errors.hourlyRate !== ''),
});
(__VLS_ctx.form.hourlyRate);
/** @type {__VLS_StyleScopedClasses['field-input']} */ ;
// @ts-ignore
[errors, errors, form,];
var __VLS_20;
const __VLS_23 = BaseButton || BaseButton;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
    type: "submit",
    loading: (__VLS_ctx.status === 'loading'),
}));
const __VLS_25 = __VLS_24({
    type: "submit",
    loading: (__VLS_ctx.status === 'loading'),
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
const { default: __VLS_28 } = __VLS_26.slots;
// @ts-ignore
[status,];
var __VLS_26;
const __VLS_29 = ResultPanel || ResultPanel;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    ...{ class: "mt-8" },
    title: "Quote estimate",
    status: (__VLS_ctx.status),
    errorMessage: (__VLS_ctx.errorMessage),
    loadingMessage: "Reading your project description...",
}));
const __VLS_31 = __VLS_30({
    ...{ class: "mt-8" },
    title: "Quote estimate",
    status: (__VLS_ctx.status),
    errorMessage: (__VLS_ctx.errorMessage),
    loadingMessage: "Reading your project description...",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
const { default: __VLS_34 } = __VLS_32.slots;
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
var __VLS_32;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
