import { fakeApiCall } from '@/apis/fakeApiCall'
import { assign, fromPromise, setup } from 'xstate'

const multistepMachineConfigs = setup({
  id: 'multistep',
  guards: {
    isFormValid: ({ context }) => {
      const { name, email, password } = context.formData
      return name && email && password
    },
  },
  actors: {
    submitForm: fromPromise(async ({ input }) => {
      console.log('submitting form', input)
      return fakeApiCall(...input)
    }),
  },
})

export const multistepMachine = multistepMachineConfigs.createMachine({
  initial: 'name',
  context: {
    formData: {
      name: '',
      email: '',
      password: '',
    },
  },
  states: {
    name: {
      on: {
        NEXT: 'email',
        UPDATE: {
          actions: assign({
            formData: ({ context, event }) => ({
              ...context.formData,
              name: event.value,
            }),
          }),
        },
      },
    },
    email: {
      on: {
        NEXT: 'password',
        PREV: 'name',
        UPDATE: {
          actions: assign({
            formData: ({ context, event }) => ({
              ...context.formData,
              email: event.value,
            }),
          }),
        },
      },
    },
    password: {
      on: {
        SUBMIT: {
          target: 'submit',
          guard: 'isFormValid',
        },
        PREV: 'email',
        UPDATE: {
          actions: assign({
            formData: ({ context, event }) => ({
              ...context.formData,
              password: event.value,
            }),
          }),
        },
      },
    },
    submit: {
      invoke: {
        src: 'submitForm',
        input: ({ context }) => ({ ...context.formData }),
        onDone: { target: 'success' },
        onError: { target: 'error' },
      },
    },
    error: {},
    success: {
      on: {
        RESET: {
          target: 'name',
          actions: assign({
            formData: {
              name: '',
              email: '',
              password: '',
            },
          }),
        },
      },
    },
  },
})
