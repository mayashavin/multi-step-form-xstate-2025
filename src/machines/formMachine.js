import { fakeApiCall } from '@/apis/fakeApiCall'
import { assign, fromPromise, setup } from 'xstate'

const submitForm = fromPromise(({ input }) => {
  console.log('submitting form', input.context.formData)
  const { name, email, password } = input.context.formData
  return fakeApiCall({ name, email, password })
})

const formMachineOptions = setup({
  actors: {
    submitForm,
  },
  guards: {
    isFormValid: ({ context }) => {
      const { name, email, password } = context.formData
      return name && email && password
    },
  },
})

export const formMachine = formMachineOptions.createMachine({
  id: 'multiStepForm',
  initial: 'step1',
  context: { formData: { name: '', email: '', password: '' } },
  states: {
    step1: {
      on: {
        NEXT: 'step2',
        UPDATE: {
          actions: assign({
            formData: ({ context, event }) => ({
              ...context.formData,
              ...event.data,
            }),
          }),
        },
      },
    },
    step2: {
      on: {
        NEXT: 'step3',
        PREV: 'step1',
        UPDATE: {
          actions: assign({
            formData: ({ context, event }) => ({
              ...context.formData,
              ...event.data,
            }),
          }),
        },
      },
    },
    step3: {
      on: {
        PREV: 'step2',

        UPDATE: {
          actions: assign({
            formData: ({ context, event }) => ({
              ...context.formData,
              ...event.data,
            }),
          }),
        },
        SUBMIT: {
          guard: 'isFormValid',
          target: 'submitting',
        },
      },
    },
    submitting: {
      invoke: {
        src: 'submitForm',
        input: ({ context }) => ({ context }),
        onDone: { target: 'success' },
        onError: { target: 'error' },
      },
    },
    success: {},
    error: { on: { RETRY: 'step3' } },
  },
})
