import { reactive, ref } from 'vue';
import { generateContract } from '../api/contract';
import BaseButton from '../components/BaseButton.vue';
import FormField from '../components/FormField.vue';
import PageHeader from '../components/PageHeader.vue';
import ResultPanel from '../components/ResultPanel.vue';
/** Shown on the page and repeated in the generated draft. */
const disclaimer = 'Generated business terms are for drafting purposes and are not legal advice.';
const form = reactive({
    projectDescription: '',
    paymentTerms: '',
    revisionTerms: '',
    cancellationTerms: '',
    deliveryTerms: '',
});
const errors = reactive({ projectDescription: '' });
const status = ref('idle');
const errorMessage = ref('');
async function handleSubmit() {
    errors.projectDescription =
        form.projectDescription.trim() === ''
            ? 'Describe the project before generating terms.'
            : '';
    if (errors.projectDescription !== '') {
        return;
    }
    const request = {
        projectDescription: form.projectDescription.trim(),
        paymentTerms: form.paymentTerms.trim(),
        revisionTerms: form.revisionTerms.trim(),
        cancellationTerms: form.cancellationTerms.trim(),
        deliveryTerms: form.deliveryTerms.trim(),
    };
    status.value = 'loading';
    errorMessage.value = '';
    try {
        // The backend is not connected yet, so this always throws for now.
        await generateContract(request);
        // The draft will be rendered here once the RAG step exists.
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
    title: "Contract / TOS Assistant",
    description: "Describe the project and your usual terms. CreatorFlow AI drafts business terms from your own policy knowledge base so the wording stays consistent between clients.",
}));
const __VLS_2 = __VLS_1({
    title: "Contract / TOS Assistant",
    description: "Describe the project and your usual terms. CreatorFlow AI drafts business terms from your own policy knowledge base so the wording stays consistent between clients.",
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)({
    ...{ class: "mb-6 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-100/90" },
    role: "note",
});
/** @type {__VLS_StyleScopedClasses['mb-6']} */ ;
/** @type {__VLS_StyleScopedClasses['rounded-lg']} */ ;
/** @type {__VLS_StyleScopedClasses['border']} */ ;
/** @type {__VLS_StyleScopedClasses['border-amber-500/30']} */ ;
/** @type {__VLS_StyleScopedClasses['bg-amber-500/10']} */ ;
/** @type {__VLS_StyleScopedClasses['p-3']} */ ;
/** @type {__VLS_StyleScopedClasses['text-xs']} */ ;
/** @type {__VLS_StyleScopedClasses['leading-relaxed']} */ ;
/** @type {__VLS_StyleScopedClasses['text-amber-100/90']} */ ;
(__VLS_ctx.disclaimer);
__VLS_asFunctionalElement1(__VLS_intrinsics.form, __VLS_intrinsics.form)({
    ...{ onSubmit: (__VLS_ctx.handleSubmit) },
    ...{ class: "space-y-6" },
    novalidate: true,
});
/** @type {__VLS_StyleScopedClasses['space-y-6']} */ ;
const __VLS_5 = FormField || FormField;
// @ts-ignore
const __VLS_6 = __VLS_asFunctionalComponent1(__VLS_5, new __VLS_5({
    id: "contract-project",
    label: "Project description",
    hint: "Deliverable, scope, deadline and anything in between.",
    error: (__VLS_ctx.errors.projectDescription),
}));
const __VLS_7 = __VLS_6({
    id: "contract-project",
    label: "Project description",
    hint: "Deliverable, scope, deadline and anything in between.",
    error: (__VLS_ctx.errors.projectDescription),
}, ...__VLS_functionalComponentArgsRest(__VLS_6));
const { default: __VLS_10 } = __VLS_8.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.textarea, __VLS_intrinsics.textarea)({
    id: "contract-project",
    value: (__VLS_ctx.form.projectDescription),
    ...{ class: "field-input" },
    rows: "6",
    placeholder: "Describe your project...",
    'aria-describedby': "contract-project-hint",
    'aria-invalid': (__VLS_ctx.errors.projectDescription !== ''),
});
/** @type {__VLS_StyleScopedClasses['field-input']} */ ;
// @ts-ignore
[disclaimer, handleSubmit, errors, errors, form,];
var __VLS_8;
const __VLS_11 = FormField || FormField;
// @ts-ignore
const __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    id: "contract-payment",
    label: "Payment terms",
    hint: "For example: 50% deposit, balance on delivery.",
}));
const __VLS_13 = __VLS_12({
    id: "contract-payment",
    label: "Payment terms",
    hint: "For example: 50% deposit, balance on delivery.",
}, ...__VLS_functionalComponentArgsRest(__VLS_12));
const { default: __VLS_16 } = __VLS_14.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "contract-payment",
    value: (__VLS_ctx.form.paymentTerms),
    ...{ class: "field-input" },
    type: "text",
    placeholder: "e.g. 50% deposit, 50% on delivery",
    'aria-describedby': "contract-payment-hint",
});
/** @type {__VLS_StyleScopedClasses['field-input']} */ ;
// @ts-ignore
[form,];
var __VLS_14;
const __VLS_17 = FormField || FormField;
// @ts-ignore
const __VLS_18 = __VLS_asFunctionalComponent1(__VLS_17, new __VLS_17({
    id: "contract-revisions",
    label: "Revision terms",
    hint: "How many rounds are included, and what counts as a revision.",
}));
const __VLS_19 = __VLS_18({
    id: "contract-revisions",
    label: "Revision terms",
    hint: "How many rounds are included, and what counts as a revision.",
}, ...__VLS_functionalComponentArgsRest(__VLS_18));
const { default: __VLS_22 } = __VLS_20.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "contract-revisions",
    value: (__VLS_ctx.form.revisionTerms),
    ...{ class: "field-input" },
    type: "text",
    placeholder: "e.g. 2 rounds included, extra rounds billed hourly",
    'aria-describedby': "contract-revisions-hint",
});
/** @type {__VLS_StyleScopedClasses['field-input']} */ ;
// @ts-ignore
[form,];
var __VLS_20;
const __VLS_23 = FormField || FormField;
// @ts-ignore
const __VLS_24 = __VLS_asFunctionalComponent1(__VLS_23, new __VLS_23({
    id: "contract-cancellation",
    label: "Cancellation terms",
    hint: "Notice period and what happens to work already done.",
}));
const __VLS_25 = __VLS_24({
    id: "contract-cancellation",
    label: "Cancellation terms",
    hint: "Notice period and what happens to work already done.",
}, ...__VLS_functionalComponentArgsRest(__VLS_24));
const { default: __VLS_28 } = __VLS_26.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "contract-cancellation",
    value: (__VLS_ctx.form.cancellationTerms),
    ...{ class: "field-input" },
    type: "text",
    placeholder: "e.g. 7 days notice, deposit is non-refundable",
    'aria-describedby': "contract-cancellation-hint",
});
/** @type {__VLS_StyleScopedClasses['field-input']} */ ;
// @ts-ignore
[form,];
var __VLS_26;
const __VLS_29 = FormField || FormField;
// @ts-ignore
const __VLS_30 = __VLS_asFunctionalComponent1(__VLS_29, new __VLS_29({
    id: "contract-delivery",
    label: "Delivery terms",
    hint: "File formats, delivery method and how long the files stay available.",
}));
const __VLS_31 = __VLS_30({
    id: "contract-delivery",
    label: "Delivery terms",
    hint: "File formats, delivery method and how long the files stay available.",
}, ...__VLS_functionalComponentArgsRest(__VLS_30));
const { default: __VLS_34 } = __VLS_32.slots;
__VLS_asFunctionalElement1(__VLS_intrinsics.input)({
    id: "contract-delivery",
    value: (__VLS_ctx.form.deliveryTerms),
    ...{ class: "field-input" },
    type: "text",
    placeholder: "e.g. WAV + MP3 by WeTransfer, kept for 30 days",
    'aria-describedby': "contract-delivery-hint",
});
/** @type {__VLS_StyleScopedClasses['field-input']} */ ;
// @ts-ignore
[form,];
var __VLS_32;
const __VLS_35 = BaseButton || BaseButton;
// @ts-ignore
const __VLS_36 = __VLS_asFunctionalComponent1(__VLS_35, new __VLS_35({
    type: "submit",
    loading: (__VLS_ctx.status === 'loading'),
}));
const __VLS_37 = __VLS_36({
    type: "submit",
    loading: (__VLS_ctx.status === 'loading'),
}, ...__VLS_functionalComponentArgsRest(__VLS_36));
const { default: __VLS_40 } = __VLS_38.slots;
// @ts-ignore
[status,];
var __VLS_38;
const __VLS_41 = ResultPanel || ResultPanel;
// @ts-ignore
const __VLS_42 = __VLS_asFunctionalComponent1(__VLS_41, new __VLS_41({
    ...{ class: "mt-8" },
    title: "Business terms draft",
    status: (__VLS_ctx.status),
    errorMessage: (__VLS_ctx.errorMessage),
    loadingMessage: "Drafting the terms from your policy knowledge base...",
}));
const __VLS_43 = __VLS_42({
    ...{ class: "mt-8" },
    title: "Business terms draft",
    status: (__VLS_ctx.status),
    errorMessage: (__VLS_ctx.errorMessage),
    loadingMessage: "Drafting the terms from your policy knowledge base...",
}, ...__VLS_functionalComponentArgsRest(__VLS_42));
/** @type {__VLS_StyleScopedClasses['mt-8']} */ ;
const { default: __VLS_46 } = __VLS_44.slots;
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
var __VLS_44;
// @ts-ignore
[];
const __VLS_export = (await import('vue')).defineComponent({});
export default {};
